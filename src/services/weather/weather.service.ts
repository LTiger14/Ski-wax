import { Injectable } from '@angular/core';
import { Jsonp, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

import { Metrics, MetricTemp } from '../model';


@Injectable()
export class WeatherService {

    private readonly BASE_URL = 'https://api.darksky.net/forecast/';
    private readonly APIKEY = '2bfda52e55a4d5bd32c5b340b378ecd0';

    constructor(private jsonp: Jsonp) {
    }

    // TODO units pick
    getCurrentWeather(metrics: Metrics, lon: number, lat: number) {
        return this.jsonp.get(this.formatUrl(metrics, lon, lat))
            .map(res => res.json())
            .catch(error => this.handleError(error));
    }

    private handleError (error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
          const body = error.json() || '';
          const err = body.error || JSON.stringify(body);
          errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
          errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

    private formatUrl(metrics: Metrics, lon: number, lat: number): string {
        let units = metrics.temp === MetricTemp.C ? 'si': 'us';
        return this.BASE_URL + `${this.APIKEY}/${lat},${lon}?units=${units}&exclude=minutely&callback=JSONP_CALLBACK`;
    }
}