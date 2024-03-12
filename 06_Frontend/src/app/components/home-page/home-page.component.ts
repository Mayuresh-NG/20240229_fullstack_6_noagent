import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthService } from '../../services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Import MatDialog and your PopupComponent
import { MatDialog } from '@angular/material/dialog';
import { SignupPopupComponent } from '../signup-popup/signup-popup.component';
import { LoginPopupComponent } from '../login-popup/login-popup.component';
import { RouterLink } from '@angular/router';
import { SellRentPageComponent } from '../sell-rent-page/sell-rent-page.component';

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
    SellRentPageComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  constructor(public dialog: MatDialog) {}

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

  selectedCity: string = ''; // To store the selected city

  // List of cities
  cities: string[] = ['Delhi', 'Mumbai', 'Bangalore', 'Chennai'];

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
}
