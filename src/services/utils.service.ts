import { Injectable } from '@angular/core';
import { differenceInHours } from 'date-fns';

import { VALID_WEATHER_DURATION } from './constant';

@Injectable()
export class UtilsService {

    isWeatherDataValid(weatherDate: Date): boolean {
        return differenceInHours(weatherDate, Date.now()) > VALID_WEATHER_DURATION ? false: true;
    }

    // TODO once google api is integrated
    isLocationValid(currentCity: string, savedCity: string): boolean {
        return currentCity === savedCity? true: false;
    }
}