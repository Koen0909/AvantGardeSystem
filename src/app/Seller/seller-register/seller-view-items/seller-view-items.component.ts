import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-seller-view-items',
  templateUrl: './seller-view-items.component.html',
  styleUrl: './seller-view-items.component.css'
})
export class SellerViewItemsComponent implements OnInit{
  items: any[] = [];

  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    this.authService.getUser().subscribe((user: { uid: string | undefined; }) => {
      if (user && user.uid) {
        this.firestore.collection('users').doc(user.uid).collection('seller-view-items')
          .valueChanges().subscribe((items: any[]) => {
            this.items = items;
          }, error => {
            console.error('Error fetching items: ', error);
          });
      }
    });
  }
}
