import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerCollectionComponent } from './buyer-collection.component';

describe('BuyerCollectionComponent', () => {
  let component: BuyerCollectionComponent;
  let fixture: ComponentFixture<BuyerCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuyerCollectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuyerCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
