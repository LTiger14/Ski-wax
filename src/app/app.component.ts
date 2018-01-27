import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { SettingsPage } from '../pages/settings/settings';
import { PageInterface } from '../services/model';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{items: PageInterface[]}>;

  constructor(public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      {
        items: [
          { title: 'Home', name: 'HomePage', component: HomePage, index: 0, icon: 'home' },
          { title: 'Settings', name: 'SettingsPage', component: SettingsPage, index: 1, icon: 'settings'}
        ]
      }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  // Put the gray background over the tab if active
  isActive(page: PageInterface): boolean {
    let childNav;
    if (this.nav.getActive())
    childNav = this.nav.getActive().name;
    if (childNav) {
      return childNav === page.name;
    }
    return false;
  }
}
