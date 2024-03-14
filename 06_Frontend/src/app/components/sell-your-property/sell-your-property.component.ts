import { FormsModule } from '@angular/forms';
import { Component,inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule,HttpHeaders } from '@angular/common/http';
import { log } from 'console';

@Component({
  selector: 'app-sell-your-property',
  standalone: true,
  imports: [NavbarComponent,FormsModule,CommonModule,HttpClientModule],
  templateUrl: './sell-your-property.component.html',
  styleUrl: './sell-your-property.component.css'
})
export class SellYourPropertyComponent {
  // BHK Type
  bhkType: string = '';
  bhkTypeInputFocused: boolean = false;

  // Built up Area
  builtUpArea: string = '';
  builtUpAreaInputFocused: boolean = false;

  // State
  state: string = '';
  stateInputFocused: boolean = false;

  // Address
  streetName: string = '';
  streetNameInputFocused: boolean = false;
  city: string = '';
  cityInputFocused: boolean = false;
  landmark: string = '';
  landmarkInputFocused: boolean = false;
  pincode: string = '';
  pincodeInputFocused: boolean = false;

  // Furnishing
  furnishing: boolean=false;


  // Property Price
  propertyPrice: string = '';
  propertyPriceInputFocused: boolean = false;

  // Property Type
  propertyType: string = '';
  propertyTypeInputFocused: boolean = false;

  depositePrice: string = '';
  depositePriceInputFocused: boolean = false;

  // Amenities
  amenities: string = '';
  amenitiesInputFocused: boolean = false;

 authToken:string|null = ''

  // ... (other form variables)
  constructor(private http: HttpClient) {
    this.authToken = localStorage.getItem('authToken');
    
  }

  saveAndPost(): void {
    const propertyData = {
      prop_price: parseInt(this.propertyPrice, 10), // Assuming propertyPrice is a string
      bhk_type: this.bhkType,
      built_Up_area: this.builtUpArea,
      state: this.state,
      street_name: this.streetName,
      city: this.city,
      Landmark: this.landmark,
      pincode: this.pincode,
      Furnished: this.furnishing,
      // images: this.images,
      deposit: parseInt(this.depositePrice, 10), // Assuming depositePrice is a string
      property_type: this.propertyType,
      amenities: this.amenities
    };

    if (this.authToken) {
      // Prepare the headers
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.authToken}` // Use the token here
        })
      };

      this.http.post('http://localhost:5200/properties/sell', propertyData, httpOptions)
        .subscribe({
          next: (response) => {
            console.log('Property posted successfully', response);
            // Handle success response
            window.alert("Your property posted successfully!!");
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