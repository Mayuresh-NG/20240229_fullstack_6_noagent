import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
 
  circleX = 0;
  circleY = 0;

  onMouseMove(event: MouseEvent): void {
    this.circleX = event.clientX;
    this.circleY = event.clientY;
  }
}
