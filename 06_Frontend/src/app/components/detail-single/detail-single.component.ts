import { FooterComponent } from '../footer/footer.component';
import { ProfileComponent } from '../profile/profile.component';
import { NavbarComponent } from './../navbar/navbar.component';
import { Component, OnInit } from '@angular/core';
import { RouterEvent, RouterLink } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { Property } from '../../interface/request';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail-single',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, ProfileComponent, RouterLink, CommonModule],
  templateUrl: './detail-single.component.html',
  styleUrl: './detail-single.component.css'
})
export class DetailSingleComponent {
  Properties: Property[] = [];
  headers ={}
  // authToken: string | null = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router : Router

  ) { }

  ngOnInit() {
    // console.log(this.authToken)
    const authToken = localStorage.getItem('authToken');

    // Check if the token exists
    if (!authToken) {
      console.error('Authentication token not found');
      return;
    }
    // Include the token in the request headers
    this.headers = { 'Authorization': `Bearer ${authToken}` };

    this.route.params.subscribe(params => {
      const propertyId = params['id']; // Fetch property ID from URL parameters
      this.getPropertyDetails(propertyId); // Call method to fetch property details
    });
  }

  getPropertyDetails(propertyId: any): void {
    // Retrieve the token from local storage
    // Include the token in the request headers
    this.http.get<Property[]>('http://localhost:5200/properties')
      .subscribe((properties: Property[]) => {

        // Filter properties by status
        const Properties = properties.filter(property => property._id?.toString() === propertyId.toString());
        // Assign filtered properties to this.filteredProperties if any
        if (Properties.length > 0) {
          this.Properties = Properties

        } else {
          console.log('No properties found.');
        }
      });
  }

  approveProperty(): void {
    console.log(this.headers)
    const propertyId = this.Properties[0]._id;

    // console.log(headers)
    this.http.put<any>(`http://localhost:5200/admin/admin_approval?propertyId=${propertyId}`,{},{headers : this.headers})
      .subscribe((response: any) => {
        console.log(response); // Log the response
        // Handle any UI updates or notifications
        this.router.navigate(['/requestlist']);
      });
    
  }

  deleteProperty(): void {
    // Call the HTTP function to delete the property
    const propertyId = this.Properties[0]._id;
    this.http.delete<any>(`http://localhost:5200/admin/admin_rejection?propertyId=${propertyId}`,{headers : this.headers})
      .subscribe((response: any) => {
        console.log(response); // Log the response
        // Handle any UI updates or notifications
        this.router.navigate(['/requestlist']);
      });
  }
}
