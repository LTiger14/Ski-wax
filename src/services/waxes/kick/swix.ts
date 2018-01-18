import { Wax, WaxSelector } from '../../model';

export class Swix implements WaxSelector {
	waxes: Array<Wax> = [
		{
			name: 'V05 Polar Grip Wax',
			uri: 'swix_v05.jpg',
			newSnow: { min: -25,  max: -12},
			oldSnow: { min: -30, max: -15},
		},
		{
			name: 'V20 Green Grip',
			uri: 'swix_v20.jpg',
			newSnow: { min: -15,  max: -8},
			oldSnow: { min: -18, max: -10},
		},
		{
			name: 'V30 Blue Grip Wax',
			uri: 'swix_v30.jpg',
			newSnow: { min: -10,  max: -2},
			oldSnow: { min: -15, max: -5},
		},
		{
			name: 'V40 Blue Extra Grip',
			uri: 'swix_v40.jpg',
			newSnow: { min: -7,  max: -1},
			oldSnow: { min: -10, max: -3},
		},
		{
			name: 'V45 Violet Special',
			uri: 'swix_v45.jpg',
			newSnow: { min: -3,  max: 0},
			oldSnow: { min: -6, max: -2},
		},
		{
			name: 'V50 Violet Grip',
			uri: 'swix_v50.jpg',
			newSnow: { min: 0,  max: 0},
			oldSnow: { min: -3, max: -1},
		},
		{
			name: 'V55 Red Special',
			uri: 'swix_v55.jpg',
			newSnow: { min: 0,  max: 1},
			oldSnow: { min: -2, max: 0},
		},
		{
			name: 'V60 Red/Silver',
			uri: 'swix_v60.jpg',
			newSnow: { min: 0,  max: 3},
			oldSnow: { min: -1, max: 1},
		}
		];

		sprays: Array<Wax> = [
			{
				name: 'Blue Grip Spray',
				uri: 'swix_blue-grip-spray.jpg',
				newSnow: { min: -15, max: -2 },
				oldSnow: { min: -15, max: -2 }
			},
			{
				name: 'Violet Grip Spray',
				uri: 'swix_violet-grip-spray.jpg',
				newSnow: { min: -3, max: 0 },
				oldSnow: { min: -3, max: 0 }
			},
			{
				name: 'Red Grip Spray',
				uri: 'swix_red-grip-spray.jpg',
				newSnow: { min: 0, max: 3 },
				oldSnow: { min: 0, max: 3 }
			},
		]; 
}