import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SignupPopupComponent } from '../signup-popup/signup-popup.component';
import { LoginPopupComponent } from '../login-popup/login-popup.component';
import { Router, RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DataService } from '../../services/data.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SellRentPageComponent } from '../sell-rent-page/sell-rent-page.component';
import { ProfileComponent } from '../profile/profile.component';

interface PropertyData {
  success: boolean;
  message: string;
  properties: Array<{
    Address: string;
    deposit: number;
    rent_price: number;
    built_Up_area: number;
    // Add more properties if needed
  }>;
}

@Component({
  selector: 'app-home-page',
  standalone: true,
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  imports: [
    NavbarComponent,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    SignupPopupComponent,
    RouterLink,
    SellRentPageComponent,
    ProfileComponent,
    HttpClientModule
  ],
})
export class HomePageComponent {
  loggedIn: boolean = false;
  buyActive: boolean = false;
  rentActive: boolean = false;
  selectedState: string = '';
  states: string[] = ['Delhi', 'Maharashtra', 'Karnataka', 'Telangana'];

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private http: HttpClient,
    private dataService: DataService
  ) {
    this.loggedIn = !!localStorage.getItem('authToken');
  }

  openPopup(): void {
    const dialogRef = this.dialog.open(SignupPopupComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The popup was closed');
    });
  }

  showLoginPopup(): void {
    const dialogRef = this.dialog.open(LoginPopupComponent, {
      width: '300px',
    });

    const sub = dialogRef.componentInstance.loginStateChange.subscribe((isLoggedIn: boolean) => {
      this.loggedIn = isLoggedIn;
      sub.unsubscribe();
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The popup was closed');
    });
  }

  toggleBuyActive(): void {
    this.buyActive = !this.buyActive;
    this.rentActive = false;
  }

  toggleRentActive(): void {
    this.rentActive = !this.rentActive;
    this.buyActive = false;
  }
  
  postAd(): void {
    if (localStorage.getItem('authToken')) {
      this.router.navigate(['/sell-rent']);
    } else {
      this.showLoginPopup();
    }
  }

  searchProperties(): void {
    const type = this.buyActive ? 'buy' : 'rent';
    console.log(type);

    const url = `http://localhost:5200/properties/search?locality=${encodeURIComponent(this.selectedState)}&type=${encodeURIComponent(type)}`;

    this.http.get<PropertyData>(url)
      .subscribe({
        next: (data) => {
          console.log(this.selectedState);
          console.log(data);

          if (data && Array.isArray(data.properties) && data.properties.length > 0) {
            const properties = data.properties;
            const firstProperty = properties[0];
            const address = firstProperty.Address;
            const deposit = firstProperty.deposit;
            const rent = firstProperty.rent_price;
            const builtupArea = firstProperty.built_Up_area;

            console.log('Address:', address);
            console.log('Deposit:', deposit);
            console.log('Rent:', rent);
            console.log('Builtup Area:', builtupArea);

            this.dataService.setPropertyData(data);
            this.router.navigate(['/viewproperty']);
          } else {
            console.error('Properties array not found in data object.');
          }
        },
        error: (error) => {
          console.error('Error fetching property details:', error);
        }
      });
  }
}
