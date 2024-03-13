import { Component, OnInit  } from '@angular/core';
import { ProfileComponent } from '../profile/profile.component';
import { RouterLink } from '@angular/router';
// import { RequestService } from '../../request.service';
import { ActivatedRoute } from '@angular/router';
import { Property } from '../../interface/request';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { log } from 'console';



@Component({
  selector: 'app-request-list',
  standalone: true,
  imports: [ProfileComponent,RouterLink, CommonModule],
  templateUrl: './request-list.component.html',
  styleUrl: './request-list.component.css',
})

// export class RequestListComponent{}
export class RequestListComponent implements OnInit{
  filteredProperties: Property[] = [];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient

  ) {}

  ngOnInit() {
    // console.log('RequestListComponent initialized');
    this.fetchFilteredProperties();
    // console.log('RequestListComponent ok');
  }

  dropdownOpen = false;

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
    console.log(this.dropdownOpen);
    
  }

  fetchFilteredProperties(): void {
    const state = 'pending'; // Specify the state you want to filter by
    this.http.get<Property[]>('http://localhost:5200/properties')
      .subscribe((properties: Property[]) => {
        console.log('All properties fetched:', properties);
  
        // Filter properties by status
        const filteredProperties = properties.filter(property => property.status === state);
        console.log('Filtered properties:', filteredProperties);
  
        // Assign filtered properties to this.filteredProperties if any
        if (filteredProperties.length > 0) {
          this.filteredProperties = filteredProperties;
        } else {
          console.log('No properties with status "pending" found.');
        }
      });
  }

}
