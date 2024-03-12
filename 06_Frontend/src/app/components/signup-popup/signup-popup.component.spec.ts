import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupPopupComponent } from './signup-popup.component';

describe('SignupPopupComponent', () => {
  let component: SignupPopupComponent;
  let fixture: ComponentFixture<SignupPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignupPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
