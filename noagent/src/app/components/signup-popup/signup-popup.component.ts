import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormControl, FormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-signup-popup',
  standalone: true,
  imports: [FormsModule,CommonModule,],
  templateUrl: './signup-popup.component.html',
  styleUrl: './signup-popup.component.css'
})
export class SignupPopupComponent {
  constructor(
    public dialogRef: MatDialogRef<SignupPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  closePopup(): void {
    this.dialogRef.close();
  }

  fullName: string = ''; // Declare fullName variable to bind with input field
  fullNameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(50)
  ]);


  email: string = '';
  phoneNumber: string = '';
  password: string = '';
  
}
