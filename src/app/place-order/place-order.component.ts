import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from 'express';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrl: './place-order.component.css'
})
export class PlaceOrderComponent implements OnInit{
  orderDetails: any;
  selectedPaymentMethod: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Access state data passed through router navigation
    this.route.paramMap.subscribe(() => {
      this.orderDetails = history.state.orderDetails;
    });
  }

  selectPaymentMethod(method: string): void {
    this.selectedPaymentMethod = method;
  }

  confirmOrder(): void {
    if (this.selectedPaymentMethod && this.orderDetails) {
      // Save order to Firestore or handle the order confirmation here
      console.log('Order confirmed:', {
        ...this.orderDetails,
        paymentMethod: this.selectedPaymentMethod
      });

      // Redirect or show confirmation message
      alert('Order placed successfully!');
    } else {
      alert('Please select a payment method.');
    }
  }
}
