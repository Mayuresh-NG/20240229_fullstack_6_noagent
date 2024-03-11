import { Component } from '@angular/core';
import { SortFilterComponent } from '../sort-filter/sort-filter.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-view-properties',
  standalone: true,
  imports: [SortFilterComponent,CommonModule],
  templateUrl: './view-properties.component.html',
  styleUrl: './view-properties.component.css'
})
export class ViewPropertiesComponent {
  propertyData = [
    { rent: 14000, deposit: 30000, builtup: '1500 sqft' },
    { rent: 14000, deposit: 30000, builtup: '1500 sqft' },
    { rent: 14000, deposit: 30000, builtup: '1500 sqft' },
    { rent: 14000, deposit: 30000, builtup: '1500 sqft' },
  ];
}
