import { Component, OnInit } from '@angular/core';
import { ProfileComponent } from '../profile/profile.component';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Wishlist } from '../../interface/request';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { Property } from '../../interface/request';

@Component({
  selector: 'app-my-wishlist',
  standalone: true,
  imports: [ProfileComponent, RouterLink, CommonModule],
  templateUrl: './my-wishlist.component.html',
  styleUrl: './my-wishlist.component.css'
})
export class MyWishlistComponent implements OnInit {
  wishlistItems: Wishlist[] = [];
  fetchedProperties: Property[] = []

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.fetchWishlistItems();
  }

  fetchWishlistItems(): void {

    // Obtain JWT token from wherever it's stored (e.g., localStorage)
    const token = localStorage.getItem('authToken');

    // Check if token exists
    if (token) {
      // Set the Authorization header with the token
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      this.http.get<any>('http://localhost:5200/users/wishlist', { headers: headers })
        .subscribe((items: any) => {
          console.log('All wishlist items fetched:', items);
          this.wishlistItems = items;
          this.processWishlistItems();
        }, error => {
          console.error('Failed to fetch wishlist items:', error);
        });
    } else {
      console.error('No token provided');
    }
  }
  

  processWishlistItems(): void {
    // Extract property IDs from wishlist items

    const propertyIds = this.wishlistItems[0].propertyIds
    // Fetch properties for the extracted property IDs
    // Iterate over each property ID and fetch the corresponding property

    // Fetch all properties
    this.http.get<Property[]>('http://localhost:5200/properties')
      .subscribe((properties: Property[]) => {
        console.log('All properties fetched:', properties);

        // Filter properties based on property IDs
        for (const propertyId of propertyIds) {
          const filteredProperty = properties.filter(property => property._id === propertyId);
          console.log("yeh hi",filteredProperty)
          if (filteredProperty.length > 0) {
            // Push the filtered property to the fetchedProperties array
            this.fetchedProperties.push(filteredProperty[0]); // Assuming property IDs are unique
          }
        }
        //....
        console.log(this.fetchedProperties)
      }, error => {
        console.error('Failed to fetch properties:', error);
      });
  } 

  removewishlist(propertyId: string): void {
    // Implement logic to remove property from wishlist
    // This method will be called when the remove button is clicked
    console.log('Removing property from wishlist:', propertyId);
    // Call your API to remove the property from the wishlist
  }
  toggleOwnerDetails(property: Property): void {
    property.showOwnerDetails = !property.showOwnerDetails;
  }
  
};

