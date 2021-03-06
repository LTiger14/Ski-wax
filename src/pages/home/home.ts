import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { Loading } from 'ionic-angular/components/loading/loading';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { Diagnostic } from '@ionic-native/diagnostic';
import { Geolocation } from '@ionic-native/geolocation';
import * as moment from 'moment-timezone';

import { DataStore } from '../../services/data-store';
import { WeatherService } from '../../services/weather/weather.service';
import { CONFIG, DEFAULT_METRICS } from '../../services/constant';
import { DateCity, Forecast, DataPoint, SnowType, HomeLocation, ActivityLevel, Metrics } from '../../services/model';
import { LocationService } from '../../services/location.service';
import { UtilsService } from '../../services/utils.service';
import { LocationPage } from '../location/location';
import { WaxSelectionService } from '../../services/wax-selection.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  //Hacks
  activityLevels = ActivityLevel;
  snowTypes = SnowType;
  moment = moment;
  Date = Date;

  city: string;
  forecast: Forecast;
  temperature: number;
  futureItems: DataPoint[];
  lat: number;
  lon: number;
  metrics: Metrics;
  // TODO update model
  snowType: SnowType = SnowType.OLD_SNOW;
  activityLevel: ActivityLevel = ActivityLevel.SPORT;
  weatherImage: string;

  constructor(public alertCtrl: AlertController,
    public navCtrl: NavController,
    public geolocation: Geolocation,
    public loadingCtrl: LoadingController,
    public modalController: ModalController,
    public utilService: UtilsService,
    public waxSelectionService: WaxSelectionService,
    private dataStore: DataStore,
    private diagnostic: Diagnostic,
    private locationService: LocationService,
    private toastCtr: ToastController,
    private weatherService: WeatherService) {
  }

  ngOnInit() {
    // Check if location is on UNCOMMENT BEFORE RELEASE
    // this.diagnostic.isLocationAvailable().then(
    //   (value) => {
    //     if (value === true) {
    //       this.initializeWeather();
    //     } else {
    //       let toast = this.toastCtr.create({
    //         message: 'Location service unavailable',
    //         duration: 3000,
    //         position: 'bottom'
    //       });
    //       toast.present();
    //       this.changeLocation();
    //     }
    //   });
    this.initializeWeather();
    this.checkConvert();
    // Setup base data
    this.dataStore.getData(CONFIG.METRICS_PREFERENCES).then(data => {
      if (data === null) {
        this.dataStore.setData(CONFIG.METRICS_PREFERENCES, DEFAULT_METRICS);
        this.metrics = DEFAULT_METRICS;
      } else {
        this.metrics = data;
      }
    }
    );
  }

  private checkConvert() {
    // TODO once the ticket for the UI is done
    // if(localStorage.getItem('new metrics')) {
    //   this.metrics = JSON.parse(localStorage.getItem('new metrics')) as Metrics;
    //   this.temperature = this.metrics.temp === MetricTemp.C ?
    //     this.forecast.currently.temperature: this.utilService.convertTemp(this.forecast.currently.temperature);
    //   localStorage.removeItem('new metrics');
    // }
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
      let alert;
      if (error.constructor.name === 'PositionError') {
        alert = this.alertCtrl.create({
          title: 'Location error',
          subTitle: 'Unable to fetch device location please check the network connection.',
          buttons: ['Ok']
        });
        alert.present();
      }
      console.error('An error occured' + error);
      loading.dismiss();
    });
  }

  private loadWeather(lon: number, lat: number, loading: Loading): void {
    this.dataStore.getData(CONFIG.WEATHER_DATA).then(data => {
      this.setForecast(data as Forecast);
      this.snowType = this.utilService.getSnowType([this.forecast.currently]);
      this.weatherImage = this.utilService.getWeatherIcon(this.forecast.currently.icon);      
      this.fetchWax();
    }).catch(error => this.fetchWeather(lon, lat, loading));
  }

  private fetchWeather(lon: number, lat: number, loading: Loading): void {
    this.weatherService.getCurrentWeather(this.metrics, lon, lat)
    .subscribe(res => {
      this.setForecast(res as Forecast);
      this.snowType = this.utilService.getSnowType([this.forecast.currently]);
      this.weatherImage = this.utilService.getWeatherIcon(this.forecast.currently.icon);
      this.dataStore.setData(CONFIG.WEATHER_DATA, res);
      this.dataStore.setData(CONFIG.WEATHER_UPDATE_AND_CITY,
        { 'city': this.locationService.city, 'date': new Date()} as DateCity);
      this.fetchWax();
      loading.dismiss();
    });
  }

  private fetchWax(): void {
    console.log('>>>>>> Forecast', this.forecast);
    this.waxSelectionService
      .selectWax(this.forecast.currently.temperature, this.snowType,
        this.activityLevel, this.forecast.currently.humidity);
  }

  public onSnowChange(): void {
    this.fetchWax();
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
    this.temperature = value.currently.temperature;
    this.futureItems = value.hourly.data.slice(1,6);
    this.futureItems.forEach((item, index) => 
      item.stringTemp = this.utilService.addTime(moment.tz(Date.now(), this.forecast.timezone).format('ha'), index));
  }

  private initializePosition(): Promise<any> {
    // Get the position of the user
    return this.geolocation.getCurrentPosition();
  }

}
