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
        let weatherIcon: string;
        switch (icon) {
            case 'clear-day':
                weatherIcon = 'day-sunny';
                break;
            case 'clear-night':
                weatherIcon = 'night-clear';
                break;
            case 'cloudy':
            case 'fog':
            case 'rain':
            case 'sleet':
            case 'snow':
            case 'sunrise':
            case 'sunset':
                weatherIcon = icon;
                break;
            case 'default':
                weatherIcon = 'na';
                break;
            case 'partly-cloudy-day':
                weatherIcon = 'day-cloudy';
                break;
            case 'partly-cloudy-night':
                weatherIcon = 'night-alt-cloudy';
                break;
            case 'wind':
                weatherIcon = 'strong-wind';
                break;
            default:
                weatherIcon = 'alien'
                break;
        }

        return `wi-${weatherIcon}`;
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

    addTime(time: string, index: number): string {
        let hour: number;
        let amPm: string;
        let res: number;
        if(time.length === 4) {
            hour = Number.parseInt(time.substring(0,2)) + index;
            amPm = time.substring(2,4);          
        } else {
            hour = Number.parseInt(time.substring(0,1)) + index;            
            amPm = time.substring(1,3);
        }
        res = this.findHour(hour);
        amPm = this.findAmPm(hour, amPm);   

        return res + amPm;
    }

    private findHour(num: number): number {
        return num > 12? num - 12: num;
    }
    private findAmPm(num: number, str: string): string {
        return (num === 12 && str === 'pm')? 'am': 'pm';
    }
}