import { Component, OnInit  } from '@angular/core';
import { ProfileComponent } from '../profile/profile.component';
import { RouterLink } from '@angular/router';
import { RequestService } from '../../request.service';
import { Property } from '../../interface/request';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-request-list',
  standalone: true,
  imports: [ProfileComponent,RouterLink],
  templateUrl: './request-list.component.html',
  styleUrl: './request-list.component.css',
})

// export class RequestListComponent{}
export class RequestListComponent implements OnInit{
  filteredProperties: Property[] = [];

  constructor(http: HttpClient) {}

  ngOnInit() {
    console.log('RequestListComponent initialized');
    this.fetchFilteredProperties();
    console.log('RequestListComponent ok');
  }

  fetchFilteredProperties(): void {
    const state = 'pending'; // Specify the state you want to filter by
    // this.http.get<Property[]>('http://localhost:5200/properties?status=' + state)
    //   .subscribe((properties: Property[]) => {
    //     console.log('Filtered properties fetched:', properties);
    //     this.filteredProperties = properties;
    //   });
  }

}
