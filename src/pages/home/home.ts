import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Loading } from 'ionic-angular/components/loading/loading';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { Geolocation } from '@ionic-native/geolocation';

import { DataStore } from '../../services/data-store';
import { WeatherService } from '../../services/weather/weather.service';
import { CONFIG } from '../../services/constant';
import { DateCity, Forecast } from '../../services/model';
import { LocationService } from '../../services/location.service';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  city: string;
  forecast: Forecast;
  weatherImage: string;

  constructor(public navCtrl: NavController,
    public geolocation: Geolocation,
    public loadingCtrl: LoadingController,
    public utilService: UtilsService,
    private dataStore: DataStore,
    private locationService: LocationService,
    private weatherService: WeatherService) {

      this.initializeWeather();
  }

  private initializeWeather() {
    let loading = this.loadingCtrl.create({
      content: 'Fetching location data, please wait...'
    });
    
    loading.present();
    this.initializePosition().then(resp => {
      let lat = resp.coords.latitude;
      let lon = resp.coords.longitude;

      this.locationService.getLocationName(lon, lat)
        .subscribe(res => {
          this.city = this.locationService.city = res.results[0].formatted_address.split(',')[1];
          this.dataStore.getData(CONFIG.WEATHER_UPDATE_AND_CITY).then(data => {
            if (data.city !== null && data.city !== undefined) {
              if(this.utilService.isLocationValid(this.locationService.city, data.city)
                && this.utilService.isWeatherDataValid(data.date)) {
                  this.loadWeather(lon, lat, loading);
                  loading.dismiss();
              }
              else this.fetchWeather(lon, lat, loading);
            } else this.fetchWeather(lon, lat, loading);
          })
          .catch(error => this.fetchWeather(lon, lat, loading));
        });
    })
    .catch(error => {
      // TODO : handle error
      console.error('An error occured' + error);
      loading.dismiss();
    });
  }

  private loadWeather(lon: number, lat: number, loading: Loading): void {
    this.dataStore.getData(CONFIG.WEATHER_DATA).then(data => {
      this.forecast = data as Forecast;
      this.weatherImage = this.utilService.getWeatherIcon(this.forecast.currently.icon);      
      console.log(this.forecast);
    }).catch(error => this.fetchWeather(lon, lat, loading));
  }

  private fetchWeather(lon: number, lat: number, loading: Loading): void {
    this.weatherService.getCurrentWeather(lon, lat)
    .subscribe(res => {
      this.forecast = res as Forecast;
      this.weatherImage = this.utilService.getWeatherIcon(this.forecast.currently.icon);      
      console.log(this.forecast);
      this.dataStore.setData(CONFIG.WEATHER_DATA, res);
      this.dataStore.setData(CONFIG.WEATHER_UPDATE_AND_CITY,
        { 'city': this.locationService.city, 'date': new Date()} as DateCity);
      loading.dismiss();
    });
  }

  private initializePosition(): Promise<any> {
    // Get the position of the user
    return this.geolocation.getCurrentPosition();
  }

}
