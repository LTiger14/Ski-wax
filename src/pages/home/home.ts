import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { Geolocation } from '@ionic-native/geolocation';

import { WeatherService } from '../../services/weather/weather.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  lat: number;
  lon: number;

  constructor(public navCtrl: NavController,
    public geolocation: Geolocation,
    public loadingCtrl: LoadingController,
    private weatherService: WeatherService) {

      this.initializeWeather();
  }

  private initializeWeather() {
    let loading = this.loadingCtrl.create({
      content: 'Fetching location data, please wait...'
    });
    
    loading.present();
    this.initializePosition().then(resp => {
      this.lat = resp.coords.latitude;
      this.lon = resp.coords.longitude;
      this.weatherService.getCurrentWeather(this.lon, this.lat)
        .subscribe(res => {
          console.log(res)
          loading.dismiss();
        });
    })
    .catch(error => {
      // TODO : handle error
      console.error('An error occured' + error);
      loading.dismiss();
    });
  }

  private initializePosition(): Promise<any> {
    // Get the position of the user
    return this.geolocation.getCurrentPosition();
  }

}
