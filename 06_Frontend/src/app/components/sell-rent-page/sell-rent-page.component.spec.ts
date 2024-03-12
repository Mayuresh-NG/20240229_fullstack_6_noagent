import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellRentPageComponent } from './sell-rent-page.component';

describe('SellRentPageComponent', () => {
  let component: SellRentPageComponent;
  let fixture: ComponentFixture<SellRentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellRentPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SellRentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
