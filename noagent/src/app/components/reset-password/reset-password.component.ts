// Importing necessary modules from Angular
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';

// Component decorator specifying the metadata for the component
@Component({
  // Selector used to identify the component in HTML
  selector: 'app-reset-password',
  // Indicates that this component is a standalone component
  standalone: true,
  // Array of modules to import for this component
  imports: [NavbarComponent, FormsModule, CommonModule],
  // Path to the HTML template file
  templateUrl: './reset-password.component.html',
  // Path to the CSS styling file
  styleUrls: ['./reset-password.component.css']
})
// Class representing the ResetPasswordComponent
export class ResetPasswordComponent {
  // Boolean flag to track whether the password input is focused
  passwordInputFocused: boolean = false;
  
  // String variable to store the user's new password
  password: string = '';
}
