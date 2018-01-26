import { Injectable } from '@angular/core';
import { differenceInHours } from 'date-fns';

import { VALID_WEATHER_DURATION } from './constant';
import { DataPoint, SnowType } from './model';

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

    getSnowType(data: Array<DataPoint>): SnowType {
        if (data.length === 1) {
            return data[0].precipType === 'snow'? SnowType.NEW_SNOW: SnowType.OLD_SNOW;
        } else {
            return SnowType.OLD_SNOW;
        }
    }

    // Util method to convert C to F
    convertTemp(temp: number): number {
        return temp * 1.8 + 32;
    }
}