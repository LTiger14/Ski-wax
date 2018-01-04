import { BrowserModule } from '@angular/platform-browser';
import { JsonpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { IonicStorageModule } from '@ionic/storage';

import { Geolocation } from '@ionic-native/geolocation';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { WeatherImagePipe } from '../pipes/image.pipe';
import { UtilsService } from '../services/utils.service';
import { DataStore } from '../services/data-store';
import { WeatherService } from '../services/weather/weather.service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    WeatherImagePipe
  ],
  imports: [
    BrowserModule,
    JsonpModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage
  ],
  providers: [
    DataStore,
    Geolocation,
    SplashScreen,
    UtilsService,
    StatusBar,
    WeatherService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
