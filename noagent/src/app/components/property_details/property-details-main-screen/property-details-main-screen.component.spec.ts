import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyDetailsMainScreenComponent } from './property-details-main-screen.component';

describe('PropertyDetailsMainScreenComponent', () => {
  let component: PropertyDetailsMainScreenComponent;
  let fixture: ComponentFixture<PropertyDetailsMainScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertyDetailsMainScreenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PropertyDetailsMainScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
