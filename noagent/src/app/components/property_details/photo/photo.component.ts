import { trigger, state, style, animate, transition } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-photo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './photo.component.html',
  styleUrl: './photo.component.css',
  animations: [
    trigger('slide', [
      state('center', style({ transform: 'translateX(0)' })),
      state('left', style({ transform: 'translateX(0)' })),
      state('right', style({ transform: 'translateX(0)' })),
      transition('center => left', animate('200ms ease-in-out')),
      transition('center => right', animate('200ms ease-in-out')),
      transition('left => center', animate('200ms ease-in-out')),
      transition('right => center', animate('200ms ease-in-out')),
    ]),
  ],
})
export class PhotoComponent {
  images: string[] = ['../../../../assets/images/room1.jpg',
                      '../../../../assets/images/room2.jpg',
                      '../../../../assets/images/room3.jpg']; // Array of image URLs
  currentIndex = 0;
  currentSlide = 'center';

  nextImage() {
    this.currentSlide = 'left';
    setTimeout(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
      this.currentSlide = 'center';
    }, 500);
  }
  
  prevImage() {
    this.currentSlide = 'right';
    setTimeout(() => {
      this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
      this.currentSlide = 'center';
    }, 500);
  }
}
