import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { Geolocation } from '@ionic-native/geolocation';

import { DataStore } from '../../services/data-store';
import { WeatherService } from '../../services/weather/weather.service';
import { CONFIG } from '../../services/constant';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
    public geolocation: Geolocation,
    public loadingCtrl: LoadingController,
    private dataStore: DataStore,
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
      this.dataStore.setData(CONFIG.HOME_LOCATION, {lat, lon});
      this.weatherService.getCurrentWeather(lon, lat)
        .subscribe(res => {
          console.log(res);
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
