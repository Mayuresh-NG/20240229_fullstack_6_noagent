import { Component } from '@angular/core';
import { ProfileComponent } from '../profile/profile.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-request-list',
  standalone: true,
  imports: [ProfileComponent,RouterLink],
  templateUrl: './request-list.component.html',
  styleUrl: './request-list.component.css'
})
export class RequestListComponent {

}
