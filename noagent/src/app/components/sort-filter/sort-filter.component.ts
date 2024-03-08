import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatSliderModule} from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-sort-filter',
  standalone: true,
  imports: [CommonModule,MatSlideToggleModule,MatSliderModule,FormsModule],
  templateUrl: './sort-filter.component.html',
  styleUrl: './sort-filter.component.css',
 
})
export class SortFilterComponent {

  selectedContent: number = 1;

  toggleContent(contentIndex: number): void {
    this.selectedContent = contentIndex;
  }
  selectedOptions: string[] = [];
  toggleSelection(option: string) {
    const index = this.selectedOptions.indexOf(option);
    if (index === -1) {
      this.selectedOptions.push(option);
    } else {
      this.selectedOptions.splice(index, 1);
    }
    console.log("Selected Options:", this.selectedOptions); // Print selected options in console
  }

    sliderValue!: number;
    sliderMinValue: number = 0; // Set your minimum value here
    sliderMaxValue: number = 100; // Set your maximum value here

    // Method to handle slider change event
    onSliderChange() {
        // Update the min and max values based on sliderValue
        this.sliderMinValue = 0; // You might update this value based on your requirement
        this.sliderMaxValue = this.sliderValue; // Assuming the max value is the slider value itself
        // You can access the slider value using this.sliderValue
        console.log(this.sliderValue);
    }


    checkbox1: boolean = false;
  checkbox2: boolean = false;
  checkbox3: boolean = false;
  checkboxes: string[] = [];

  printSelectedValue(checkboxLabel: string, isChecked: boolean) {
    if (isChecked) {
      this.checkboxes.push(checkboxLabel);
    } else {
      const index = this.checkboxes.indexOf(checkboxLabel);
      if (index !== -1) {
        this.checkboxes.splice(index, 1);
      }
    }
    console.log(this.checkboxes);
  }
  
}
