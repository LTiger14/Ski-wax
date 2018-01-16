import { BrowserModule } from '@angular/platform-browser';
import { JsonpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LocationPage } from '../pages/location/location';

import { IonicStorageModule } from '@ionic/storage';

import { Geolocation } from '@ionic-native/geolocation';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { WeatherImagePipe } from '../pipes/image.pipe';
import { RoundPipe } from '../pipes/round.pipe';
import { UtilsService } from '../services/utils.service';
import { DataStore } from '../services/data-store';
import { WeatherService } from '../services/weather/weather.service';
import { LocationService } from '../services/location.service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LocationPage,
    RoundPipe,
    WeatherImagePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    JsonpModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LocationPage,
  ],
  providers: [
    DataStore,
    Geolocation,
    LocationService,
    SplashScreen,
    UtilsService,
    StatusBar,
    WeatherService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
