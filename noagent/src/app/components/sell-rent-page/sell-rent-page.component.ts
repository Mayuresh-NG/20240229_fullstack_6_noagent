import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { SellYourPropertyComponent } from '../sell-your-property/sell-your-property.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { RentYourPropertyComponent } from '../rent-your-property/rent-your-property.component';

@Component({
  selector: 'app-sell-rent-page',
  standalone: true,
  imports: [CommonModule,RouterLink,SellYourPropertyComponent,NavbarComponent,RouterModule,RentYourPropertyComponent],
  templateUrl: './sell-rent-page.component.html',
  styleUrl: './sell-rent-page.component.css'
})
export class SellRentPageComponent {

}
