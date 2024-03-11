import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sell-your-property',
  standalone: true,
  imports: [NavbarComponent,FormsModule,CommonModule],
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
  furnishing: string = '';

  // Property Price
  propertyPrice: string = '';
  propertyPriceInputFocused: boolean = false;

  // Property Type
  propertyType: string = '';
  propertyTypeInputFocused: boolean = false;

  // Amenities
  amenities: string = '';
  amenitiesInputFocused: boolean = false;

  // ... (other form variables)

  saveAndPost(): void {
    console.log('BHK Type:', this.bhkType);
    console.log('Built up Area:', this.builtUpArea);
    console.log('State:', this.state);
    console.log('Street:', this.streetName);
    console.log('City:', this.city);
    console.log('Landmark:', this.landmark);
    console.log('Pincode:', this.pincode);
    // ... (log other form values)

    console.log('Furnishing:', this.furnishing);
    console.log('Property Price:', this.propertyPrice);
    console.log('Property Type:', this.propertyType);
    console.log('Amenities:', this.amenities);
  }
}
