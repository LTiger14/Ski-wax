import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Loading } from 'ionic-angular/components/loading/loading';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { Geolocation } from '@ionic-native/geolocation';

import { DataStore } from '../../services/data-store';
import { WeatherService } from '../../services/weather/weather.service';
import { CONFIG } from '../../services/constant';
import { DateCity } from '../../services/model';
import { LocationService } from '../../services/location.service';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

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
          this.locationService.city = res.results[0].formatted_address.split(',')[1];
          this.dataStore.getData(CONFIG.WEATHER_UPDATE_AND_CITY).then(data => {
            if (data.city !== null && data.city !== undefined) {
              if(this.utilService.isLocationValid(this.locationService.city, data.city)
                && this.utilService.isWeatherDataValid(data.date)) {
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

  private fetchWeather(lon: number, lat: number, loading: Loading): void {
    this.weatherService.getCurrentWeather(lon, lat)
    .subscribe(res => {
      console.log(res);
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
