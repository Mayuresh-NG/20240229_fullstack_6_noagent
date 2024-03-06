import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentYourPropertyComponent } from './rent-your-property.component';

describe('RentYourPropertyComponent', () => {
  let component: RentYourPropertyComponent;
  let fixture: ComponentFixture<RentYourPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentYourPropertyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RentYourPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
