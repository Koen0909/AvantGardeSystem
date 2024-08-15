import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

interface CartItem {
  id: string;
  imageUrl: string;
  name: string;
  creator: string;
  price: number;
  size: string;
  description: string;
  addedAt: any; // Firestore Timestamp
  expirationDate?: Date; // Optional for display
  remainingTime?: string; // For countdown timer
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{
  cartItems$: Observable<CartItem[]> = new Observable<CartItem[]>();
  userId: string | null = null;
  totalPrice: number = 0;
  checkedItems: Set<string> = new Set(); // To track checked items
  cartItems: CartItem[] = []; // Local variable to store cart items
  countdownTimers: Subscription[] = []; // To manage countdown subscriptions

  constructor(
    private afAuth: AngularFireAuth, 
    private firestore: AngularFirestore,
    private router: Router // Inject Router
  ) {}

  ngOnInit(): void {
    this.cartItems$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          this.userId = user.uid;
          return this.firestore.collection('users').doc(user.uid).collection('cart').valueChanges({ idField: 'id' });
        } else {
          return [];
        }
      }),
      map(items => {
        const now = new Date();
        return items.filter((item: any) => {
          const addedAt = item.addedAt.toDate(); // Convert timestamp to Date
          const timeDiff = now.getTime() - addedAt.getTime();
          const hoursDiff = timeDiff / (1000 * 3600);
          return hoursDiff <= 24; // Keep items added within the last 24 hours
        }).map((item: any) => ({
          ...item,
          expirationDate: new Date(item.addedAt.toDate().getTime() + 24 * 60 * 60 * 1000) // Calculate expiration time
        }));
      })
    );

    this.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.updateTotalPrice();
    });
  }

  removeFromCart(itemId: string): void {
    if (this.userId) {
      this.firestore.collection('users').doc(this.userId).collection('cart').doc(itemId).delete()
        .then(() => {
          console.log('Item removed from cart');
        })
        .catch(error => {
          console.error('Error removing item from cart: ', error);
        });
    }
  }

  updateTotal(event: any, item: CartItem): void {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.checkedItems.add(item.id);
    } else {
      this.checkedItems.delete(item.id);
    }
    this.updateTotalPrice();
  }

  updateTotalPrice(): void {
    this.totalPrice = 0;
    this.cartItems.forEach(item => {
      if (this.checkedItems.has(item.id)) {
        this.totalPrice += item.price;
      }
    });
  }

  placeOrder(): void {
    const checkedItemsList = this.cartItems.filter(item => this.checkedItems.has(item.id));
    const orderDetails = {
      items: checkedItemsList,
      totalPrice: this.totalPrice,
      paymentMethod: null // Placeholder for payment method
    };

    // Navigate to the order page with order details
    this.router.navigate(['/place-order'], { state: { orderDetails } });
  }
}