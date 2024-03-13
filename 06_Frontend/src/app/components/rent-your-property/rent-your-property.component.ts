import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule,HttpHeaders,HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-rent-your-property',
  standalone: true,
  imports: [FormsModule,CommonModule,HttpClientModule],
  templateUrl: './rent-your-property.component.html',
  styleUrl: './rent-your-property.component.css'
})
export class RentYourPropertyComponent {
  // Left Side - Property Details
  bhkType: string = '';
  builtUpArea: string = '';
  state: string = '';
  streetName: string = '';
  city: string = '';
  landmark: string = '';
  pincode: string = '';

  bhkTypeInputFocused: boolean = false;
  builtUpAreaInputFocused: boolean = false;
  stateInputFocused: boolean = false;
  streetNameInputFocused: boolean = false;
  cityInputFocused: boolean = false;
  landmarkInputFocused: boolean = false;
  pincodeInputFocused: boolean = false;

  // Right Side - Rental Details
  furnishing: string = '';
  rentPrice: string = '';
  availableFrom: string = '';
  deposit: string = '';

  rentPriceInputFocused: boolean = false;
  availableFromInputFocused: boolean = false;
  depositInputFocused: boolean = false;
  authToken:string|null=''

  constructor(private http: HttpClient) {
    this.authToken = localStorage.getItem('authToken');
    
  }

  saveAndPost(): void {
    const propertyData = {
      rent_price: parseInt(this.rentPrice, 10), // Assuming propertyPrice is a string
      bhk_type: this.bhkType,
      built_Up_area: this.builtUpArea,
      state: this.state,
      Address: {
        street_name: this.streetName,
        city: this.city,
        Landmark: this.landmark,
        pincode: this.pincode
      },
      Furnished: this.furnishing,
      // images: this.images,
      deposit: parseInt(this.deposit, 10), // Assuming depositePrice is a string
      availableFrom:this.availableFrom
    };

    if (this.authToken) {
      // Prepare the headers
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.authToken}` // Use the token here
        })
      };

      this.http.post('http://localhost:5200/properties/rent', propertyData, httpOptions)
        .subscribe({
          next: (response) => {
            console.log('Property posted successfully', response);
            // Handle success response
          },
          error: (error) => {
            console.error('Error posting property', error);
            // Handle error
          }
        });
    } else {
      console.error('No auth token found');
      // Handle the case where the token is not available
    }
  }
}


