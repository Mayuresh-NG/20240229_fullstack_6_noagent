// Import necessary modules and components
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SignupPopupComponent } from '../signup-popup/signup-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-popup',
  standalone: true,
  imports: [FormsModule, CommonModule, SignupPopupComponent], 
  templateUrl: './login-popup.component.html',
  styleUrls: ['./login-popup.component.css'],
})
export class LoginPopupComponent {
  constructor(
    public dialogRef: MatDialogRef<LoginPopupComponent>, // Inject MatDialogRef for dialog functionality
    @Inject(MAT_DIALOG_DATA) public data: any, // Inject MAT_DIALOG_DATA for passing data to the dialog
    public dialog: MatDialog,
    private router: Router
  ) {}

  // Close the dialog
  closePopup(): void {
    this.dialogRef.close(); 
  }

  openPopup(): void {
    // Close the current dialog
    this.closePopup(); 
    // Open the SignupPopupComponent dialog
    const dialogRef = this.dialog.open(SignupPopupComponent, {
      width: '300px', 
    });

    dialogRef.afterClosed().subscribe((result) => {
      // Log when the popup is closed
      console.log('The popup was closed'); 
    });
  }

  navigateToForgotPassword() {
    this.router.navigate(['/forgotpassword']);
    this.closePopup()
  }

  username: string = ''; // Initialize username variable
  usernameInputFocused: boolean = false; // Track if username input is focused
  passwordInputFocused: boolean = false; // Track if password input is focused
  password: string = ''; // Initialize password variable

  onContinueClick(): void {
    console.log('Username:', this.username); // Log username when "Continue" button is clicked
    console.log('Password:', this.password); // Log password when "Continue" button is clicked
  }
}
