import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { Loading } from 'ionic-angular/components/loading/loading';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { Geolocation } from '@ionic-native/geolocation';

import { DataStore } from '../../services/data-store';
import { WeatherService } from '../../services/weather/weather.service';
import { CONFIG } from '../../services/constant';
import { DateCity, Forecast, DataPoint, SnowType, HomeLocation } from '../../services/model';
import { LocationService } from '../../services/location.service';
import { UtilsService } from '../../services/utils.service';
import { LocationPage } from '../location/location';
import { WaxSelectionService } from '../../services/wax-selection.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  city: string;
  forecast: Forecast;
  futureItems: DataPoint[];
  lat: number;
  lon: number;
  // TODO update model
  snowType: SnowType = SnowType.NEW_SNOW;
  weatherImage: string;

  constructor(public navCtrl: NavController,
    public geolocation: Geolocation,
    public loadingCtrl: LoadingController,
    public modalController: ModalController,
    public utilService: UtilsService,
    public waxSelectionService: WaxSelectionService,
    private dataStore: DataStore,
    private locationService: LocationService,
    private weatherService: WeatherService) {

      this.initApp();
  }

  private async initApp() {
    var res = await this.initializeWeather();
    console.log(res);
  }

  private initializeWeather() {
    let loading = this.loadingCtrl.create({
      content: 'Fetching location data, please wait...'
    });
    
    loading.present();
    this.initializePosition().then(resp => {
      this.lat = resp.coords.latitude;
      this.lon = resp.coords.longitude;

      this.locationService.getLocationName(this.lon, this.lat)
        .subscribe(res => {
          this.city = this.locationService.city = res.results[0].formatted_address.split(',')[1];
          this.dataStore.getData(CONFIG.WEATHER_UPDATE_AND_CITY).then(data => {
            if (data.city !== null && data.city !== undefined) {
              if(this.utilService.isLocationValid(this.locationService.city, data.city)
                && this.utilService.isWeatherDataValid(data.date)) {
                  this.loadWeather(this.lon, this.lat, loading);
                  loading.dismiss();
              }
              else this.fetchWeather(this.lon, this.lat, loading);
            } else this.fetchWeather(this.lon, this.lat, loading);
          })
          .catch(error => this.fetchWeather(this.lon, this.lat, loading));
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
      this.setForecast(data as Forecast);
      this.weatherImage = this.utilService.getWeatherIcon(this.forecast.currently.icon);      
      this.fetchWax();
    }).catch(error => this.fetchWeather(lon, lat, loading));
  }

  private fetchWeather(lon: number, lat: number, loading: Loading): void {
    this.weatherService.getCurrentWeather(lon, lat)
    .subscribe(res => {
      this.setForecast(res as Forecast);
      this.weatherImage = this.utilService.getWeatherIcon(this.forecast.currently.icon);
      this.dataStore.setData(CONFIG.WEATHER_DATA, res);
      this.dataStore.setData(CONFIG.WEATHER_UPDATE_AND_CITY,
        { 'city': this.locationService.city, 'date': new Date()} as DateCity);
      this.fetchWax();
      loading.dismiss();
    });
  }

  private fetchWax(): void {
    this.waxSelectionService.selectWax(this.forecast.currently.temperature, this.snowType);
  }

  public changeLocation(): void {
    let modal = this.modalController.create(LocationPage);
    modal.onDidDismiss((data: HomeLocation) => {
      if (data) {
        this.dataStore.setData(CONFIG.WEATHER_UPDATE_AND_CITY,
          { 'city': data.name, 'date': new Date()} as DateCity);
        this.city = data.name;
        this.locationService.city = data.name;
        this.lat = data.lat;
        this.lon = data.lon;

        let loading = this.loadingCtrl.create({
          content: 'Fetching location data, please wait...'
        });
        
        loading.present();
        this.fetchWeather(this.lon, this.lat, loading);
      }
    });
    modal.present();
  }

  public setForecast(value: Forecast): void {
    this.forecast = value;
    this.futureItems = value.hourly.data.slice(1,6);
  }

  private initializePosition(): Promise<any> {
    // Get the position of the user
    return this.geolocation.getCurrentPosition();
  }

}
