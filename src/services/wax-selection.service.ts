import { Injectable } from '@angular/core';

import { SnowType, ActivityLevel, Wax } from './model';
import { Swix } from './waxes/kick/swix';

@Injectable()
export class WaxSelectionService {
	waxes: Array<Wax> = [];
	swix: Swix;
	
	constructor() {
		this.swix = new Swix();
	}

	selectWax(temp: number, snowType: SnowType, activity?: ActivityLevel): void {
		this.waxes = this.swix.findWax(temp, snowType, activity);
		console.log(this.waxes);
	}
}