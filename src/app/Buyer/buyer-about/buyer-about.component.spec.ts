import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerAboutComponent } from './buyer-about.component';

describe('BuyerAboutComponent', () => {
  let component: BuyerAboutComponent;
  let fixture: ComponentFixture<BuyerAboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuyerAboutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuyerAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
