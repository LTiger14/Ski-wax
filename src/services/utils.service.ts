import { Injectable } from '@angular/core';
import { differenceInHours } from 'date-fns';

import { VALID_WEATHER_DURATION } from './constant';

@Injectable()
export class UtilsService {

    isWeatherDataValid(weatherDate: Date): boolean {
        return differenceInHours(weatherDate, Date.now()) > VALID_WEATHER_DURATION ? false: true;
    }

    isLocationValid(currentCity: string, savedCity: string): boolean {
        return currentCity === savedCity? true: false;
    }

    getWeatherIcon(icon: string): string {
        if (icon) {
          return 'assets/imgs/' + icon + '.png';
        } else {
          return 'assets/imgs/default.png';
        }
    }

    // Util method to convert C to F
    convertTemp(temp: number): number {
        return temp * 1.8 + 32;
    }
}