import { Injectable } from '@angular/core';

import { SnowType, ActivityLevel, Wax, WaxSelector } from './model';
import { Swix } from './waxes/kick/swix';

@Injectable()
export class WaxSelectionService {
	options: Array<Wax> = [];
	swix: WaxSelector;
	
	constructor() {
		//Change in refactor to allow other brands
		this.swix = new Swix();
	}

	selectWax(temp: number, snowType: SnowType, activity: ActivityLevel, humidity?: number): void {
		this.options = this.findWax(this.swix.waxes, temp, snowType, activity, humidity);
		if (activity == ActivityLevel.ACTIVE) {
			this.options = this.options.concat(this.findWax(this.swix.sprays, temp, snowType, activity));
		}
		console.log('>>>>> Options', this.options);
	}

	findWax(waxes: Array<Wax>, temp: number, snowType: SnowType, activityLevel: ActivityLevel, humidity?: number): Array<Wax> {
		let response: Array<Wax> = [];
		if (temp < -30) {
			response = [waxes[0]];
		} else if (temp > 3) {
			response = [waxes[waxes.length - 1]];
		} else {
			if (snowType === SnowType.NEW_SNOW) {
				waxes.forEach((wax: Wax) => {
					if (this.between(temp, wax.newSnow.min, wax.newSnow.max)) {
						response.push(wax);
					}
				});
			} else {
				waxes.forEach((wax: Wax) => {
					if (this.between(temp, wax.oldSnow.min, wax.oldSnow.max)) {
						response.push(wax);
					}
				});
			}
		}

		if (response.length > 1) {
			if (activityLevel == ActivityLevel.ACTIVE) {
				response = [response[response.length-1]];
			} else if (activityLevel === ActivityLevel.SPORT || activityLevel === ActivityLevel.RACING) {			
				response = [response[0]];
			}
		}
		return response;
	}

	private between(x, min, max): boolean {
		return x>=min && x<=max;
	}
}