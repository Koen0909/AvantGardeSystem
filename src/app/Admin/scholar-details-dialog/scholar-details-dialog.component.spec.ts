import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScholarDetailsDialogComponent } from './scholar-details-dialog.component';

describe('ScholarDetailsDialogComponent', () => {
  let component: ScholarDetailsDialogComponent;
  let fixture: ComponentFixture<ScholarDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScholarDetailsDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScholarDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
