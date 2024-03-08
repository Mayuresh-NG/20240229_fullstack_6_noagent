import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { AuthService } from '../../service';
import { Observable } from 'rxjs';
import { BrowserModule } from '@angular/platform-browser';
import { SignupPopupComponent } from '../signup-popup/signup-popup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login-popup',
  standalone: true,
  imports: [FormsModule, CommonModule, SignupPopupComponent],
  templateUrl: './login-popup.component.html',
  styleUrl: './login-popup.component.css',
})
export class LoginPopupComponent {
  constructor(
    public dialogRef: MatDialogRef<LoginPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    // private http: HttpClient,
    private authService: AuthService
  ) 
  {}

  closePopup(): void {
    this.dialogRef.close();
  }
  openPopup(): void {
    this.closePopup()
    const dialogRef = this.dialog.open(SignupPopupComponent, {
      width: '300px', // Adjust the width based on your design
    });

    // Handle the popup closure
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The popup was closed');
    });
  }
  username: string = '';
  password: string = '';
  onContinueClick(): void {
    console.log('Username:', this.username);
    console.log('Password:', this.password);
    // You can perform further actions here, such as sending the data to a server
  }

  // login(): void {
  //   const url = 'http://localhost:3000/users/login';
  //   const body = {
  //     username: this.username,
  //     password: this.password
  //   };

  //   this.http.post(url, body).pipe(
  //     catchError(error => {
  //       console.error('Error:', error);
  //       return throwError(error);
  //     })
  //   ).subscribe((response: any) => {
  //     // Handle successful login response here
  //     console.log('Login successful:', response);
  //     // Perform further actions such as redirecting to another page
  //   });
  // }
  onSubmit(username: string, password: string): void {
    // Call the login method from the AuthService
    this.authService.login(username, password);
  }
}
