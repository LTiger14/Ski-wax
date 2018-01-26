import { Injectable } from '@angular/core';

import { SnowType, ActivityLevel, Wax, WaxesModel } from './model';
import { Swix } from './waxes/kick/swix';

@Injectable()
export class WaxSelectionService {
	options: Array<Wax> = [];
	swix: WaxesModel;
	
	constructor() {
		//Change in refactor to allow other brands
		this.swix = new Swix();
	}

	selectWax(temp: number, snowType: SnowType, activity: ActivityLevel, humidity?: number): void {
		if (activity == ActivityLevel.RACING) {
			this.options = this.findWax(this.swix.performanceWaxes, temp, snowType, activity, humidity);

			// If humidity is over 70% also give the other one
			if (humidity >= 0.7) 
				this.options = this.options.concat(this.findWax(this.swix.highPerformanceWaxes, temp, snowType, activity))
		} else if (activity == ActivityLevel.SPORT || activity == ActivityLevel.ACTIVE){
			this.options = this.findWax(this.swix.waxes, temp, snowType, activity, humidity);
		}

		if (activity == ActivityLevel.ACTIVE) {
			this.options = this.options.concat(this.findWax(this.swix.sprays, temp, snowType, activity));
		}
		console.log('>>>>> Options', this.options);
	}

	findWax(waxes: Array<Wax>, temp: number, snowType: SnowType, activityLevel: ActivityLevel, humidity?: number): Array<Wax> {
		let response: Array<Wax> = [];
		let outOfBounds: Wax = this.validateTemp(waxes, temp, snowType);
		if (outOfBounds) {
			response = [outOfBounds];
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
			} else if (activityLevel == ActivityLevel.SPORT || activityLevel == ActivityLevel.RACING) {			
				response = [response[0]];
			}
		}
		return response;
	}

	private validateTemp(waxes: Array<Wax>, temp: number, snowType: SnowType): Wax {
		let wax: Wax = null;
		switch(snowType) {
			case SnowType.NEW_SNOW:
				wax = temp < waxes[0].newSnow.min ? waxes[0]:
					(temp > waxes[waxes.length - 1].newSnow.max ? waxes[waxes.length - 1] : null);
				break;
			case SnowType.OLD_SNOW:
				wax = temp < waxes[0].oldSnow.min ? waxes[0]:
					(temp > waxes[waxes.length - 1].oldSnow.max ? waxes[waxes.length - 1] : null);
				break;
		}
		return wax;
	}

	private between(x, min, max): boolean {
		return x>=min && x<=max;
	}
}