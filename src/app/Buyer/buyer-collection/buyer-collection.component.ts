import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-buyer-collection',
  templateUrl: './buyer-collection.component.html',
  styleUrl: './buyer-collection.component.css'
})
export class BuyerCollectionComponent implements OnInit{
  profile$: Observable<any> = new Observable<any>(); // Initialize with an empty observable
  products: any[] = [];
  selectedProduct: any | null = null;

  constructor(
    private afAuth: AngularFireAuth, 
    private firestore: AngularFirestore,
    private authService: AuthService,
    private db: AngularFireDatabase,

  ) {}

  ngOnInit(): void {
    this.profile$ = this.afAuth.authState.pipe( // user profile pic
      switchMap(user => {
        if (user) {
          return this.firestore.collection('users').doc(user.uid).valueChanges();
        } else {
          return [];
        }
      })
    );
    this.firestore.collection('products').valueChanges().subscribe((data) => { //products upload to collection
      this.products = data;
    });
  }

  openPreview(product: any): void {
    this.selectedProduct = product;
  }
  
  closePreview(): void {
    this.selectedProduct = null;
  }
  
  addToCart(product: any): void {
    // Logic to add the product to the cart
    console.log('Product added to cart:', product);
  }


  logout() {
    this.authService.logout();
    
  }
}
