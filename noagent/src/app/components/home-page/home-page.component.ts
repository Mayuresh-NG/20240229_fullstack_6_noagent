import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  constructor(private authService: AuthService) {}

  isUserLoggedIn(): boolean {
    return this.authService.isLoggedIn();  // Use the injected authService
  }
}
