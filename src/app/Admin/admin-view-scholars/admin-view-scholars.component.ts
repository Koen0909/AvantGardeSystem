import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore'; 
import { MatDialog } from '@angular/material/dialog';
import { ScholarDetailsDialogComponent } from '../scholar-details-dialog/scholar-details-dialog.component';

@Component({
  selector: 'app-admin-view-scholars',
  templateUrl: './admin-view-scholars.component.html',
  styleUrl: './admin-view-scholars.component.css'
})
export class AdminViewScholarsComponent implements OnInit{
  scholars: any[] = [];
  newScholar: any = {
    fullName: '',
    middleName: '',
    lastName: '',
    age: '',
    course: '',
    homeAddress: '',
    yearLevel: ''
  };

  constructor(
    private authService: AuthService,
    private firestore: AngularFirestore,
    public dialog: MatDialog
 ) {}

 ngOnInit(): void {
  this.getScholars();
} 

getScholars(): void {
  this.firestore.collection('scholars').snapshotChanges().subscribe((data) => {
    this.scholars = data.map(e => {
      return {
        id: e.payload.doc.id,
        ...e.payload.doc.data() as any
      };
    });
  });
}


addScholar(event: Event): void {
    event.preventDefault(); // Prevent form submission
    
    if (this.newScholar.fullName && this.newScholar.course) {
      this.firestore.collection('scholars').add(this.newScholar).then(() => {
        this.newScholar = {
          fullName: '',
          middleName: '',
          lastName: '',
          age: '',
          course: '',
          homeAddress: '',
          yearLevel: ''
        }; // Reset form
        this.getScholars(); // Refresh the list of scholars
      });
    }
  }

  openScholarDialog(scholar: any): void {
    const dialogRef = this.dialog.open(ScholarDetailsDialogComponent, {
      width: '400px',
      data: scholar // Ensure `id` is included in this data
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateScholar(result); // Ensure `result` includes the `id`
      }
    });
  }  

  updateScholar(updatedScholar: any): void {
    if (updatedScholar.id) { // Ensure `id` exists
      this.firestore.collection('scholars').doc(updatedScholar.id).update({
        fullName: updatedScholar.fullName,
        middleName: updatedScholar.middleName,
        lastName: updatedScholar.lastName,
        age: updatedScholar.age,
        course: updatedScholar.course,
        homeAddress: updatedScholar.homeAddress,
        yearLevel: updatedScholar.yearLevel
      }).then(() => {
        this.getScholars(); // Refresh the list of scholars
      }).catch(error => {
        console.error("Error updating document: ", error);
      });
    } else {
      console.error("Scholar ID is missing");
    }
  }
  

  deleteScholar(scholar: any): void {
    this.firestore.collection('scholars').doc(scholar.id).delete().then(() => {
      this.getScholars(); // Refresh the list of scholars
    }).catch(error => {
      console.error("Error removing document: ", error);
    });
  }
  

logout() {
  this.authService.logout();
  
}
}
