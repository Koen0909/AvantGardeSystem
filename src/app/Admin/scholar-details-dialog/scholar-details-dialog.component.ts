import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-scholar-details-dialog',
  templateUrl: './scholar-details-dialog.component.html',
  styleUrl: './scholar-details-dialog.component.css'
})
export class ScholarDetailsDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ScholarDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  save(): void {
    console.log("Saving data: ", this.data); // Ensure ID and other data are included
    this.dialogRef.close(this.data);
  }
}
