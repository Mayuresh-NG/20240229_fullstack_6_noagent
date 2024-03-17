import { Component, OnInit } from '@angular/core';
import { ProfileComponent } from '../profile/profile.component';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Property } from '../../interface/request';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-request-list',
  standalone: true,
  imports: [ProfileComponent, RouterLink, CommonModule],
  templateUrl: './request-list.component.html',
  styleUrl: './request-list.component.css',
})

// export class RequestListComponent{}
export class RequestListComponent implements OnInit {
  filteredProperties: Property[] = [];
  selectedTradeType: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient

  ) { }

  ngOnInit() {
    // console.log('RequestListComponent initialized');
    this.fetchFilteredProperties();
  }

  dropdownOpen = false;

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
    console.log(this.dropdownOpen);
  }

  selectTradeType(tradeType: string) {
    if (tradeType === 'All') {
      // Set selected trade type to null to fetch all pending properties
      this.selectedTradeType = null;
    } else {
      this.selectedTradeType = tradeType;
    }
    this.fetchFilteredProperties();
  }


  fetchFilteredProperties(): void {
    const state = 'pending'; // Specify the state you want to filter by
    this.http.get<Property[]>('http://localhost:5200/properties')
      .subscribe((properties: Property[]) => {

        // Filter properties by status
        const filteredProperties = properties.filter(property => property.status === state);
        console.log(filteredProperties);
        
        // Assign filtered properties to this.filteredProperties if any
        if (filteredProperties.length > 0) {

          if(this.selectedTradeType === 'Rent'){
            this.filteredProperties =filteredProperties.filter(property => property.trade_type === 'rent' )
          }
          else if(this.selectedTradeType === 'Sell'){
            this.filteredProperties =filteredProperties.filter(property => property.trade_type === 'sell' )
          }
          else{
            console.log(this.selectedTradeType)
            this.filteredProperties = filteredProperties
          }
          
        } else {
          console.log('No properties with status "pending" found.');
        }
      });
  }

}
