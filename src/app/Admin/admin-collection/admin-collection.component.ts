import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-admin-collection',
  templateUrl: './admin-collection.component.html',
  styleUrl: './admin-collection.component.css'
})
export class AdminCollectionComponent implements OnInit{
  products: any[] = [];
  selectedProduct: any | null = null;

  constructor(
    private authService: AuthService,
    private firestore: AngularFirestore
 ) {}
 
 ngOnInit(): void {
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

addToCart(product: any): void {
  // Logic to add the product to the cart
  console.log('Product added to cart:', product);
}

 logout() {
  this.authService.logout();
  
}
}
