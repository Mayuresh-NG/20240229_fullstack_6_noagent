// Importing necessary Angular modules and components
import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormControl, FormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HomePageComponent } from '../home-page/home-page.component';
import { MatDialog } from '@angular/material/dialog';
import { LoginPopupComponent } from '../login-popup/login-popup.component';

@Component({
  selector: 'app-signup-popup',
  standalone: true,
  imports: [FormsModule, CommonModule, HomePageComponent, LoginPopupComponent],
  templateUrl: './signup-popup.component.html',
  styleUrl: './signup-popup.component.css',
})
export class SignupPopupComponent {
  constructor(
    // Dialog reference for popup
    public dialogRef: MatDialogRef<SignupPopupComponent>,
    // Injecting data into the dialog
    @Inject(MAT_DIALOG_DATA) public data: any,
    // Dialog service for opening/closing dialogs
    public dialog: MatDialog
  ) {}

  // Method to close the signup popup
  closePopup(): void {
    this.dialogRef.close();
  }

  // Method to show login popup
  showLoginPopup(): void {
    this.closePopup();
    const dialogRef = this.dialog.open(LoginPopupComponent, {
      width: '300px',
    });

    // Handling the closure of the login popup
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The popup was closed');
    });
  }

  // Initializing variables and form controls for user inputs
  fullName: string = '';
  fullNameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(50),
  ]);
  fullNameInputFocused: boolean = false;
  emailInputFocused: boolean = false;
  phoneNumberInputFocused: boolean = false;
  passwordInputFocused: boolean = false;
  email: string = '';
  phoneNumber: string = '';
  password: string = '';
}