import { Component } from '@angular/core';
import { ProfileComponent } from '../profile/profile.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-property-list',
  standalone: true,
  imports: [ProfileComponent,RouterLink],
  templateUrl: './property-list.component.html',
  styleUrl: './property-list.component.css',
})
export class PropertyListComponent {

}
