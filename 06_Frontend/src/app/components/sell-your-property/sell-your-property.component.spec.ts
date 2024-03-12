import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellYourPropertyComponent } from './sell-your-property.component';

describe('SellYourPropertyComponent', () => {
  let component: SellYourPropertyComponent;
  let fixture: ComponentFixture<SellYourPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellYourPropertyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SellYourPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
