import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-buyer-home',
  templateUrl: './buyer-home.component.html',
  styleUrl: './buyer-home.component.css'
})
export class BuyerHomeComponent implements OnInit{
  profile$: Observable<any> = new Observable<any>(); // Initialize with an empty observable
  products: any[] = [];
  selectedProduct: any | null = null;
  userId: string | null = null;
  allCartItems$: Observable<any[]> = new Observable<any[]>();

  constructor(
    private afAuth: AngularFireAuth, 
    private firestore: AngularFirestore,
    private authService: AuthService,
    private db: AngularFireDatabase,
  ) {}

  ngOnInit(): void {
    this.profile$ = this.afAuth.authState.pipe( //user img profile display
      switchMap(user => {
        if (user) {
          return this.firestore.collection('users').doc(user.uid).valueChanges();
        } else {
          return [];
        }
      })
    );
    this.firestore.collection('products').valueChanges().subscribe((data) => {// adds or upload product to homepage
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
    this.afAuth.authState.subscribe(user => {
      if (user) {
        const userCart = this.firestore.collection('users').doc(user.uid).collection('cart');
        const timestamp = new Date(); // Add timestamp for expiration tracking
  
        userCart.add({
          ...product,
          addedAt: timestamp // Add timestamp to the cart item
        }).then(() => {
          console.log('Product added to cart:', product);
        }).catch(error => {
          console.error('Error adding product to cart: ', error);
        });
      }
    });
  }
  
  
  logout() {
    this.authService.logout();
    
  }

}
