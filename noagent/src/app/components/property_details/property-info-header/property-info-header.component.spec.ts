import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyInfoHeaderComponent } from './property-info-header.component';

describe('PropertyInfoHeaderComponent', () => {
  let component: PropertyInfoHeaderComponent;
  let fixture: ComponentFixture<PropertyInfoHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertyInfoHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PropertyInfoHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
