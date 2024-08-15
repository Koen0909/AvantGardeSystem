import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerCollectionComponent } from './seller-collection.component';

describe('SellerCollectionComponent', () => {
  let component: SellerCollectionComponent;
  let fixture: ComponentFixture<SellerCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SellerCollectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SellerCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
