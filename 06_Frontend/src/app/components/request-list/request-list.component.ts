import { Component, OnInit  } from '@angular/core';
import { ProfileComponent } from '../profile/profile.component';
import { RouterLink } from '@angular/router';
import { RequestService } from '../../services/request.service';
import { Property } from '../../interface/request';


@Component({
  selector: 'app-request-list',
  standalone: true,
  imports: [ProfileComponent,RouterLink],
  templateUrl: './request-list.component.html',
  styleUrl: './request-list.component.css',
  providers: [RequestService] 
})

// export class RequestListComponent{}
export class RequestListComponent implements OnInit{
  filteredProperties: Property[] = []; // Use the Property interface to type the array property

  // constructor(private requestService: RequestService) {} // Inject the service

  ngOnInit() {

    console.log('RequestListComponent initialized');
    // this.fetchFilteredProperties(); // Fetch the filters when the component initializes
    console.log('RequestListComponent ok');
  }

  // fetchFilteredProperties(): void {
  //   const state = 'pending'; // Specify the state you want to filter by
  //   this.requestService.getAllProperties().subscribe((properties: Property[]) => {
  //     console.log('Filtered properties fetched:', properties);
  //     this.filteredProperties = properties; // Assign the fetched filtered properties to the property
  //   });
  // }

}
