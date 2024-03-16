import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { Property } from '../../interface/request';

@Component({
  selector: 'app-edit-property',
  standalone: true,
  imports: [NavbarComponent, FormsModule, CommonModule, HttpClientModule],
  templateUrl: './edit-property.component.html',
  styleUrl: './edit-property.component.css'
})
export class EditPropertyComponent implements OnInit {
  propertyId: string | null = '';
  propertyDetails: any;
  headers = {}

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
  furnishingFull: boolean = false;
  furnishingSemi: boolean = false;
  furnishingNone: boolean = false;


  // Property Price
  propertyPrice: string = '';
  propertyPriceInputFocused: boolean = false;

  // Property Type
  tradeType: string = '';
  propertyTypeInputFocused: boolean = false;

  depositePrice: string = '';
  depositePriceInputFocused: boolean = false;

  // Amenities
  // amenities: string = '';
  selectedAmenities: string[] | null = []
  amenitiesInputFocused: boolean = false;

  authToken: string | null = ''

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    const authToken = localStorage.getItem('authToken');
    // Check if the token exists
    if (!authToken) {
      console.error('Authentication token not found');
      return;
    }
    // Include the token in the request headers
    this.headers = { 'Authorization': `Bearer ${authToken}` };


    this.propertyId = this.route.snapshot.paramMap.get('id');
    console.log(this.propertyId)
    this.getPropertyDetails();
  }

  getPropertyDetails() {
    const url = `http://localhost:5200/properties`;

    this.http.get<Property[]>(url).subscribe(
      (properties: Property[]) => {
        this.propertyDetails = properties.filter(property => property._id?.toString() === this.propertyId)
        console.log(this.propertyDetails[0])
        if (this.propertyDetails) {
          this.propertyDetails = this.propertyDetails[0]
          // // Assign fetched data to respective form fields
          this.bhkType = this.propertyDetails.bhk_type;
          this.builtUpArea = this.propertyDetails.built_Up_area
          this.state = this.propertyDetails.state;
          this.streetName = this.propertyDetails.Address.street_name;
          this.city = this.propertyDetails.Address.city;
          this.landmark = this.propertyDetails.Address.Landmark;
          this.pincode = this.propertyDetails.Address.pincode;
          // Set furnishing options
          if (this.propertyDetails.Furnished) {
            this.furnishingFull = this.propertyDetails.Furnished.full;
            this.furnishingSemi = this.propertyDetails.Furnished.semi;
            this.furnishingNone = this.propertyDetails.Furnished.none;
          }
          this.propertyPrice = this.propertyDetails.rent_price
          this.depositePrice = this.propertyDetails.deposit.toString();
          this.tradeType = this.propertyDetails.trade_type;
          console.log(this.tradeType)
          this.depositePrice = this.propertyDetails.deposit;
          // this.amenities = this.propertyDetails.amenities;

          // Set the default value of selectedAmenities if propertyDetails has amenities
          if (this.propertyDetails.amenities && Array.isArray(this.propertyDetails.amenities)) {
            this.selectedAmenities = this.propertyDetails.amenities;
          }
        }
      },
      (error) => {
        console.error('Error fetching property details:', error);
      }
    );
  }

  updateAndPost() {

    let priceField: string;

    // Determine which price field to use based on the trade type
    if (this.tradeType === 'sell') {
      priceField = 'sell_price';
    } else {
      priceField = 'rent_price';
    }

    const modifiedFields = {

      bhk_type: this.bhkType,
      built_Up_area: this.builtUpArea,
      state: this.state,
      Address: {
        street_name: this.streetName,
        city: this.city,
        landmark: this.landmark,
        pincode: this.pincode,
      },
      furnishing: {
        full: this.furnishingFull,
        semi: this.furnishingSemi,
        none: this.furnishingNone
      },
      propertyPrice: this.propertyPrice,
      trade_type: this.tradeType,
      amenities: this.selectedAmenities,
      deposit: this.depositePrice,
      [priceField]: this.propertyPrice,
      // Add more fields as needed
    };
    console.log("New are", modifiedFields)
    console.log(this.headers)

    this.http.put(`http://localhost:5200/properties/modify_property?propertyId=${this.propertyId}`, modifiedFields, { headers: this.headers }).subscribe(
      (response: any) => {
        console.log('Property modified successfully:', response);
        // Optionally, you can show a success message or redirect the user
      },
      (error) => {
        console.error('Error modifying property:', error);
        // Optionally, you can show an error message to the user
      }
    );
  }
}

