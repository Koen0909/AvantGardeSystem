import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerAboutComponent } from './seller-about.component';

describe('SellerAboutComponent', () => {
  let component: SellerAboutComponent;
  let fixture: ComponentFixture<SellerAboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SellerAboutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SellerAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
