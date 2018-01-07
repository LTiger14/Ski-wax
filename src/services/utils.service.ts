import { Injectable } from '@angular/core';
import { Coordinates } from '@ionic-native/geolocation';
import { differenceInHours } from 'date-fns';

import { VALID_WEATHER_DURATION } from './constant';

@Injectable()
export class UtilsService {

    isWeatherDataValid(weatherDate: Date): boolean {
        return differenceInHours(weatherDate, Date.now()) > VALID_WEATHER_DURATION ? false: true;
    }

    // TODO once google api is integrated
    isLocationValid(currentCoords: Coordinates, savedCoords: Coordinates): boolean {
        return false;
    }
}