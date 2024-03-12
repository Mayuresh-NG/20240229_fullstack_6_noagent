import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSingleComponent } from './detail-single.component';

describe('DetailSingleComponent', () => {
  let component: DetailSingleComponent;
  let fixture: ComponentFixture<DetailSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailSingleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
