import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent implements OnInit {
  products: any[] = [];
  selectedProduct: any | null = null;
  userId: string | null = null;

  constructor(
    private authService: AuthService,
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
      }
    });

    this.firestore.collection('products').valueChanges().subscribe((data) => {
      this.products = data;
    });
  }

  openPreview(product: any): void {
    this.selectedProduct = product;
  }

  closePreview(): void {
    this.selectedProduct = null;
  }

  async addToCart(product: any): Promise<void> {
    if (!this.userId) {
      console.error('User not authenticated');
      return;
    }

    try {
      const cartRef = this.firestore.collection('users').doc(this.userId).collection('cart');
      const cartSnapshot = await cartRef.ref.where('artName', '==', product.artName).get();

      if (cartSnapshot.empty) {
        console.log('Adding product to cart:', product);
        await cartRef.add({
          ...product,
          addedAt: new Date()
        });
        console.log('Product added to cart:', product);
      } else {
        console.log('Product already in cart:', product);
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
