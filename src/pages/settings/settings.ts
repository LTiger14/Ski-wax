import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { DataStore } from '../../services/data-store';
import { Metrics } from '../../services/model';
import { CONFIG } from '../../services/constant';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage implements OnInit {
  metrics: Metrics;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private dataStore: DataStore) {
  }

  ngOnInit() {
    this.dataStore.getData(CONFIG.METRICS_PREFERENCES).then(data => this.metrics = data);    
  }

  savePrefs(): void {
    this.dataStore.setData(CONFIG.METRICS_PREFERENCES, this.metrics);
    localStorage.setItem('new metrics', JSON.stringify(this.metrics));
  }
}
