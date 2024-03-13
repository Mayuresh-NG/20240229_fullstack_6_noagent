// Importing necessary modules from Angular
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { HttpClientModule, HttpClient, HttpParams } from '@angular/common/http';

// Component decorator specifying the metadata for the component
@Component({
  // Selector used to identify the component in HTML
  selector: 'app-forgot-password',
  // Indicates that this component is a standalone component
  standalone: true,
  // Array of modules to import for this component
  imports: [NavbarComponent, FormsModule, CommonModule,HttpClientModule],
  // Path to the HTML template file
  templateUrl: './forgot-password.component.html',
  // Path to the CSS styling file
  styleUrls: ['./forgot-password.component.css']
})
// Class representing the ForgotPasswordComponent
export class ForgotPasswordComponent {
  // Boolean flag to track whether the email input is focused
  emailInputFocused: boolean = false;
  
  // String variable to store the user's email
  email: string = '';
  constructor(private http: HttpClient) {}

  //when button it clicked 
  forgetPassword(): void {

    this.http.post('http://localhost:5200/users/forget_password', { email: this.email })
    .subscribe(
      (response) => {
        // Handle the response from the backend
        console.log('Response:', response);
      },
      (error) => {
        // Handle any errors that occur during the request
        console.error('Error:', error);
      }
    );
  }
}
