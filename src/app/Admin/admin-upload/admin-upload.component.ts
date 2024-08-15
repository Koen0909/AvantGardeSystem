import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-admin-upload',
  templateUrl: './admin-upload.component.html',
  styleUrl: './admin-upload.component.css'
})
export class AdminUploadComponent implements OnInit {
  product = {
    artName: '',
    medium: '',
    size: '',
    frame: '',
    protection: '',
    price: 0,
    obraShares: 0,
    dateFinished: '',
    creator: '',
    description: '',
    imageUrl: '',
  };
  selectedFile: File | null = null;
  selectedUserId: string = '';
  users: any[] = []; // Array to hold users

  constructor(
    private authService: AuthService,
    private storage: AngularFireStorage, 
    private firestore: AngularFirestore
 ) {}

 ngOnInit() {
  this.loadUsers();
}

loadUsers() {
  this.firestore.collection('users').valueChanges().subscribe((users: any[]) => {
    this.users = users;
  }, error => {
    console.error('Error fetching users: ', error);
  });
}

 onFileSelected(event: any) {
  this.selectedFile = event.target.files[0];
}

onUpload() {
  if (this.selectedFile) {
    const filePath = `products/${Date.now()}_${this.selectedFile.name}`;
    const fileRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, this.selectedFile);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.product.imageUrl = url;
          this.saveProduct();
        }, error => {
          console.error('Error getting download URL: ', error);
        });
      })
    ).subscribe();
  } else {
    this.saveProduct();
  }
}

saveProduct() {
    const productRef = this.firestore.collection('products').add(this.product);

    if (this.selectedUserId) {
      this.firestore.collection('users').doc(this.selectedUserId).collection('seller-view-items').add(this.product).then(() => {
        console.log('Product added to user’s collection successfully');
      }).catch(error => {
        console.error('Error adding product to user’s collection: ', error);
      });
    }

    productRef.then(() => {
      console.log('Product added successfully');
    }).catch(error => {
      console.error('Error adding product: ', error);
    });
  }

  logout() {
    this.authService.logout();
    
  }
}
