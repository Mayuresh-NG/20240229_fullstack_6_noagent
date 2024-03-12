import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rent-your-property',
  standalone: true,
  imports: [FormsModule,CommonModule],
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
}
