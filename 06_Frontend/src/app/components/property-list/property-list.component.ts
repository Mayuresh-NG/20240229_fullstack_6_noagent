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

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ){}

  ngOnInit() {
    this.fetchProperties()
  }

  fetchProperties(): void {
    this.http.get<Property[]>('http://localhost:5200/properties')
      .subscribe((properties: Property[]) => {
        console.log('All properties fetched:', properties);
        this.properties = properties;
      });
  }
}
