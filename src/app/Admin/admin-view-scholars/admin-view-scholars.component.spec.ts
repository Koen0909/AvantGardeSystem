import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewScholarsComponent } from './admin-view-scholars.component';

describe('AdminViewScholarsComponent', () => {
  let component: AdminViewScholarsComponent;
  let fixture: ComponentFixture<AdminViewScholarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminViewScholarsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminViewScholarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
