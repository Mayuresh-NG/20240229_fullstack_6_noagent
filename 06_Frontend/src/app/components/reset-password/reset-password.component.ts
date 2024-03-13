// Importing necessary modules from Angular
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { HttpClientModule, HttpClient, HttpParams } from '@angular/common/http';

// Component decorator specifying the metadata for the component
@Component({
  // Selector used to identify the component in HTML
  selector: 'app-reset-password',
  // Indicates that this component is a standalone component
  standalone: true,
  // Array of modules to import for this component
  imports: [NavbarComponent, FormsModule, CommonModule,HttpClientModule],
  // Path to the HTML template file
  templateUrl: './reset-password.component.html',
  // Path to the CSS styling file
  styleUrls: ['./reset-password.component.css']
})
// Class representing the ResetPasswordComponent
export class ResetPasswordComponent {
  passwordInputFocused: boolean = false;
  password: string = '';
  
  constructor(private http: HttpClient) {}

  resetPassword(): void {

    this.http.post('http://localhost:5200/users/reset_password', { password:this.password })
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
