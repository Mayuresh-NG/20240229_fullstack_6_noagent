import { FooterComponent } from './../../footer/footer.component';
import { DescriptionComponent } from './../description/description.component';
import { AmenitiesComponent } from './../amenities/amenities.component';
import { PhotoComponent } from './../photo/photo.component';
import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { PropertyInfoHeaderComponent } from '../property-info-header/property-info-header.component';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-property-details-main-screen',
  standalone: true,
  imports: [NavbarComponent,PropertyInfoHeaderComponent,PhotoComponent,AmenitiesComponent,MapComponent,DescriptionComponent,FooterComponent],
  templateUrl: './property-details-main-screen.component.html',
  styleUrl: './property-details-main-screen.component.css'
})
export class PropertyDetailsMainScreenComponent {

}
