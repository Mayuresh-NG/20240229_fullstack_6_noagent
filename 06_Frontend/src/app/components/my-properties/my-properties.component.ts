import { Component, OnInit } from '@angular/core';
import { ProfileComponent } from '../profile/profile.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Property } from '../../interface/request';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-properties',
  standalone: true,
  imports: [ProfileComponent, CommonModule],
  templateUrl: './my-properties.component.html',
  styleUrl: './my-properties.component.css'
})
export class MyPropertiesComponent implements OnInit {

  Properties: Property[] = [];
  headers = {}

  constructor(
    private http: HttpClient,
    private router : Router
    ) { }

  ngOnInit() {
    const authToken = localStorage.getItem('authToken');

    // Check if the token exists
    if (!authToken) {
      console.error('Authentication token not found');
      return;
    }
    // Include the token in the request headers
    this.headers = { 'Authorization': `Bearer ${authToken}` };
    // console.log(this.headers)
    this.getMyProperties();
  }

  getMyProperties(): void {
    // Retrieve the token from local storage
    // Include the token in the request headers
    this.http.get<any>('http://localhost:5200/users/my_properties',{headers : this.headers})
    .subscribe(
      response => {
        // Check if the response contains the 'properties' field
        if (response.hasOwnProperty('properties')) {
          // Assign the properties to the 'properties' array
          this.Properties = response.properties
          console.log(this.Properties)
          // this.properties = response.properties;
        } else {
          console.log('No properties found in the response.');
        }
      },
      error => {
        // Handle error
        console.error('Error fetching user properties:', error);
      }
    );
  }

  editProperty(propertyId: string | undefined) {
    console.log("Modify clicked.")
    this.router.navigate(['/edit-property', propertyId]);
  }

  deleteProperty(propertyId: string | undefined): void {
    this.http.delete<any>(`http://localhost:5200/properties/remove_property?propertyId=${propertyId}`, { headers: this.headers })
      .subscribe(
        response => {
          console.log(response); // Log the response
          // Optionally, you can remove the property from the local array after successful deletion
          this.Properties = this.Properties.filter(property => property._id !== propertyId);
        },
        error => {
          console.error('Error deleting property:', error);
        }
      );
  }
}
