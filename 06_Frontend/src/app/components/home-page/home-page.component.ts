import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
// import { AuthService } from '../../services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Import MatDialog and your PopupComponent
import { MatDialog } from '@angular/material/dialog';
import { SignupPopupComponent } from '../signup-popup/signup-popup.component';
import { LoginPopupComponent } from '../login-popup/login-popup.component';
import { Router, RouterLink } from '@angular/router';
import { SellRentPageComponent } from '../sell-rent-page/sell-rent-page.component';
import { ProfileComponent } from '../profile/profile.component';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { DataService } from '../../services/data.service';

// Inject MatDialog in your component's constructor
@Component({
  selector: 'app-home-page',
  standalone: true,
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
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  constructor(public dialog: MatDialog,private router: Router, private http: HttpClient,
    private dataService: DataService) {}

  // Function to open the popup
  openPopup(): void {
    const dialogRef = this.dialog.open(SignupPopupComponent, {
      width: '300px', // Adjust the width based on your design
    });

    // Handle the popup closure
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The popup was closed');
    });
  }

  // Function to open the popup
  showLoginPopup(): void {
    const dialogRef = this.dialog.open(LoginPopupComponent, {
      width: '300px', // Adjust the width based on your design
    });

    // Handle the popup closure
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The popup was closed');
    });
  }

  selectedState: string = ''; // To store the selected city

  // List of cities
  states: string[] = ['Delhi', 'Maharashtra', 'Karnataka', 'Telangana'];

  selectedButton: string = ''; // To store the selected button

  isActive = false;

  buyActive = false;
  rentActive = false;

  toggleBuyActive(): void {
    this.buyActive = !this.buyActive;
    this.rentActive = false; // Set the other button to false
  }

  toggleRentActive(): void {
    this.rentActive = !this.rentActive;
    this.buyActive = false; // Set the other button to false
  }
  // constructor(private authService: AuthService) {}

  // isUserLoggedIn(): boolean {
  //   return this.authService.isLoggedIn();  // Use the injected authService
  // }
  searchProperties(): void {
    const type = this.buyActive ? 'buy' : 'rent';
    console.log(type);
    this.http.get<any[]>(`http://localhost:5200/properties/search?locality=${encodeURIComponent(this.selectedCity)}&type=${encodeURIComponent(type)}`)
    // console.log(this.selectedCity);
    // Updated to use `locality` as per the original API endpoint and included the base URL
    .subscribe({
      next: (data) => {
        console.log(this.selectedCity);
        console.log(data);
        this.dataService.setPropertyData(data);
        this.router.navigate(['/viewproperty']);
        // Assuming you have a service or a method to pass data to the ViewPropertiesComponent
        // For example, using a shared service or Angular's state management
        // Here, we'll directly navigate and assume the component fetches its own data
        // this.router.navigate(['/viewproperty']); // Make sure the route matches your configuration
      },
      error: (error) => {
        // console.log(this.selectedCity);
        console.error('Error fetching property details:', error);
      }
    });
  }
}
