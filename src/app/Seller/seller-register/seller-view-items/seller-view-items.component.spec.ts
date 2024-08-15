import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerViewItemsComponent } from './seller-view-items.component';

describe('SellerViewItemsComponent', () => {
  let component: SellerViewItemsComponent;
  let fixture: ComponentFixture<SellerViewItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SellerViewItemsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SellerViewItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
