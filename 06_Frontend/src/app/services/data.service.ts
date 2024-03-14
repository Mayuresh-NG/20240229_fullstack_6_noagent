import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private propertyData: any;

  setPropertyData(data: any) {
    this.propertyData = data;
  }

  getPropertyData() {
    return this.propertyData;
  }
}