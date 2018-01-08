import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/observable/of';

@Injectable()
export class LocationService {

	private readonly API_URL = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
	private readonly API_KEY = 'AIzaSyA6VifiHsiLsU8iDWI8tVliUQucZ9y-YTU';

	city: string = null;

	constructor(private http: HttpClient) {
	}

	getLocationName(lon: number, lat: number): Observable<any> {
		return this.http.get<any>(this.API_URL + lat + ',' + lon + '&key=' + this.API_KEY)
			.pipe(
				catchError(this.handleError('Failed to load location name'))
			);

	}

	/**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
	private handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {

			// TODO: send the error to remote logging infrastructure
			console.error(error); // log to console instead

			// Let the app keep running by returning an empty result.
			return Observable.of(result as T);
		};
	}
}