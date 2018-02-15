import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class DataStore {
  constructor(private storage: Storage) { }

  setData(key: string, data: any): void {
    this.storage.set(key, data);
  }

  getData(key: string): Promise<any> {
    return this.storage.get(key);
  }
}