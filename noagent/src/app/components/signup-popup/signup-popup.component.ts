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
    public dialogRef: MatDialogRef<SignupPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog
  ) {}

  closePopup(): void {
    this.dialogRef.close();
  }
  showLoginPopup(): void {
    this.closePopup();
    const dialogRef = this.dialog.open(LoginPopupComponent, {
      width: '300px', // Adjust the width based on your design
    });

    // Handle the popup closure
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The popup was closed');
    });
  }

  fullName: string = ''; 
  fullNameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(50),
  ]);

  email: string = '';
  phoneNumber: string = '';
  password: string = '';
}
