import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Property } from './interface/request';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private _url : string = 'http://localhost:5200/properties'

  constructor(private http : HttpClient) { }

  // Function to get all property details
  getAllProperties(): Observable<Property[]> {
    return this.http.get<Property[]>(`${this._url}/properties`);
  }

  // Function to get filtered property details (e.g., with pending state)
  getFilteredProperties(status: string): Observable<Property[]> {
    return this.http.get<Property[]>(`${this._url}/properties?status=${status}`);
  }
}


