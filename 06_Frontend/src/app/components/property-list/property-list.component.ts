import { Component, OnInit } from '@angular/core';
import { ProfileComponent } from '../profile/profile.component';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Property } from '../../interface/request';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-property-list',
  standalone: true,
  imports: [ProfileComponent,RouterLink, CommonModule],
  templateUrl: './property-list.component.html',
  styleUrl: './property-list.component.css',
})
export class PropertyListComponent implements OnInit {
  properties: Property[] = [];
  selectedTradeType: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ){}

  ngOnInit() {
    this.fetchProperties()
    console.log(this.properties)
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
    this.fetchProperties();
  }

  fetchProperties(): void {
    this.http.get<Property[]>('http://localhost:5200/properties')
      .subscribe((properties: Property[]) => {
        console.log('All properties fetched:', properties);
        
        if (properties.length > 0) {

          if(this.selectedTradeType === 'Rent'){
            this.properties =properties.filter(property => property.trade_type === 'rent' )
          }
          else if(this.selectedTradeType === 'Sell'){
            this.properties =properties.filter(property => property.trade_type === 'sell' )
          }
          else{
            console.log(this.selectedTradeType)
            this.properties = properties
          }
          
        } else {
          console.log('No properties with status "pending" found.');
        }
      });
  }
}
