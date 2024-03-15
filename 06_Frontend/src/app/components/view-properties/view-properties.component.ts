import { Component,OnInit } from '@angular/core';
import { SortFilterComponent } from '../sort-filter/sort-filter.component';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from '../profile/profile.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DataService } from '../../services/data.service';
@Component({
  selector: 'app-view-properties',
  standalone: true,
  imports: [SortFilterComponent,CommonModule,ProfileComponent,HttpClientModule],
  templateUrl: './view-properties.component.html',
  styleUrl: './view-properties.component.css'
})
export class ViewPropertiesComponent implements OnInit {
  propertyData: any[] = [];
  searchQuery: string = ''; // Adjust the type according to your data structure

  constructor(private http: HttpClient,private dataService:DataService) { }

  ngOnInit(): void {
    this.propertyData = this.dataService.getPropertyData();
  }

  fetchPropertyDetails(): void {
    const queryParams = this.searchQuery ? `?locality=${this.searchQuery}` : '';
    this.http.get<any[]>(`http://localhost:5200/properties/search${queryParams}`).subscribe({
      next: (data) => {
        this.propertyData = data;
      },
      error: (error) => {
        console.error('Error fetching property details:', error);
      }
    });
  }
}
