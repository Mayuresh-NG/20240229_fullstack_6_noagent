import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from './../navbar/navbar.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-detail-single',
  standalone: true,
  imports: [NavbarComponent,FooterComponent],
  templateUrl: './detail-single.component.html',
  styleUrl: './detail-single.component.css'
})
export class DetailSingleComponent {

}
