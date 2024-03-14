import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NavbarComponent,MatIconModule, MatButtonModule, MatMenuModule,RouterLink,HttpClientModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  adminName: string = '';
  userRole: string = '';

  constructor(private http: HttpClient) {}

  //Backend connection to display the name of logged in user 
  fetchUserDetails(): void {
    // Retrieve the token from local storage
    const authToken = localStorage.getItem('authToken');
    // console.log(authToken);
    
    // Check if the token exists
    if (!authToken) {
      console.error('Authentication token not found');
      return;
    }
  
    // Include the token in the request headers
    const headers = { 'Authorization': `Bearer ${authToken}` };
  
    this.http.get<any>('http://localhost:5200/users/get_my_profile', { headers })
      .subscribe({
        next: (response) => {
          // Assuming the response contains the username within a user object
          this.adminName = response.user.username;
        },
        error: (error) => {
          console.error('Error fetching user details:', error);
        }
      });
  }
}
