import { Wax, WaxSelector, MetricTemp, SnowType, ActivityLevel } from '../../model';

export class Swix implements WaxSelector {
	waxes: Array<Wax> = [
		{
			name: 'V05 Polar Grip Wax',
			uri: 'v05.jpg',
			newSnow: { min: -25,  max: -12},
			oldSnow: { min: -30, max: -15},
		},
		{
			name: 'V20 Green Grip',
			uri: 'v20.jpg',
			newSnow: { min: -15,  max: -8},
			oldSnow: { min: -18, max: -10},
		},
		{
			name: 'V30 Blue Grip Wax',
			uri: 'v30.jpg',
			newSnow: { min: -10,  max: -2},
			oldSnow: { min: -15, max: -5},
		},
		{
			name: 'V40 Blue Extra Grip',
			uri: 'v40.jpg',
			newSnow: { min: -7,  max: -1},
			oldSnow: { min: -10, max: -3},
		},
		{
			name: 'V45 Violet Special',
			uri: 'v45.jpg',
			newSnow: { min: -3,  max: 0},
			oldSnow: { min: -6, max: -2},
		},
		{
			name: 'V50 Violet Grip',
			uri: 'v50.jpg',
			newSnow: { min: 0,  max: 0},
			oldSnow: { min: -3, max: -1},
		},
		{
			name: 'V55 Red Special',
			uri: 'v55.jpg',
			newSnow: { min: 0,  max: 1},
			oldSnow: { min: -2, max: 0},
		},
		{
			name: 'V60 Red/Silver',
			uri: 'v60.jpg',
			newSnow: { min: 0,  max: 3},
			oldSnow: { min: -1, max: 1},
		}
		];


	findWax(temp: number, snowType: SnowType, activityLevel?: ActivityLevel): Array<Wax> {
		let response: Array<Wax> = [];
		if (temp < -30) {
			response = [this.waxes[0]];
		} else if (temp > 3) {
			response = [this.waxes[this.waxes.length - 1]];
		} else {
			if (snowType === SnowType.NEW_SNOW) {
				this.waxes.forEach((wax: Wax) => {
					if (this.between(temp, wax.newSnow.min, wax.newSnow.max)) {
						response.push(wax);
					}
				});
			} else {
				this.waxes.forEach((wax: Wax) => {
					if (this.between(temp, wax.oldSnow.min, wax.oldSnow.max)) {
						response.push(wax);
					}
				});
			}
		}
		return response;
	}

	private between(x, min, max): boolean {
		return x>=min && x<=max;
	}
}