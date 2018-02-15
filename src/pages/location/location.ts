import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { HomeLocation } from '../../services/model';

declare let google: any;

interface AutocompleteItem {
  description: string,
  place_id: string
}

@IonicPage({
  priority: 'high'
})
@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})
export class LocationPage {

  acService: any;
  autocompleteItems: Array<AutocompleteItem>;
  query: string;
  location: HomeLocation;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtr: ViewController,
              private zone: NgZone) {
  }

  ionViewWillEnter() {
    this.acService = new google.maps.places.AutocompleteService();
    this.autocompleteItems = [];
    this.query = '';
    this.location = {name: null, lat: null, lon: null};
  }

  updateList(): void {
    console.debug('modal > getPlacePredictions > query > ', this.query);    
    if(this.query.trim() === '') {
      this.autocompleteItems = [];
      return;
    }
    let self = this;
    let config = {
      types: ['(cities)'],
      input: this.query
    };
    this.acService.getPlacePredictions(config, (predictions, status) => {
      console.debug('modal > getPlacePredictions > status > ', status);
      self.zone.run(() => {
        self.autocompleteItems = predictions ? predictions : [];
      });
    });
  }

  dismiss(): void {
    this.viewCtr.dismiss();
  }

  selectItem(item: AutocompleteItem): void {
    let self = this;
    let request = {
      placeId: item.place_id
    };
    let placesService = new google.maps.places.PlacesService(document.createElement('div'));
    placesService.getDetails(request, (place, status) => {
      if (status !== google.maps.places.PlacesServiceStatus.OK) {
        console.debug('modal > getDetails > status > ', status);
        return;
      }
      self.location.lat = place.geometry.location.lat();
      self.location.lon = place.geometry.location.lng();
      self.location.name = place.address_components[0].short_name;
      self.zone.run(() => {
        self.viewCtr.dismiss(self.location);
      });
    });
  }
}
