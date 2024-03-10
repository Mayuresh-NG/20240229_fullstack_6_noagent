import { FooterComponent } from '../footer/footer.component';
import { ProfileComponent } from '../profile/profile.component';
import { NavbarComponent } from './../navbar/navbar.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-detail-single',
  standalone: true,
  imports: [NavbarComponent,FooterComponent,ProfileComponent],
  templateUrl: './detail-single.component.html',
  styleUrl: './detail-single.component.css'
})
export class DetailSingleComponent {

}
