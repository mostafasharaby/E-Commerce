import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';
import { OrderDetails } from '../Model/order-model';
import { OrderDetailsService } from '../Services/OrderDetails.service';

@Component({
  selector: 'app-Order',
  templateUrl: './Order.component.html',
  styleUrls: ['./Order.component.css']
})
export class OrderComponent implements OnInit, OnDestroy {
  orderDetails: OrderDetails[] = [];
  private orderDetailsSubscription!: Subscription; 

  constructor(private orderDetailsService: OrderDetailsService) { }

  ngOnInit(): void {
    this.loadOrderDetails();
  }

  loadOrderDetails(): void {
    this.orderDetailsSubscription = this.orderDetailsService.getOrderDetails().subscribe(
      (data: OrderDetails[]) => {
        this.orderDetails = data;
      },
      (error) => {
        console.error('Error loading order details:', error);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.orderDetailsSubscription) {
      this.orderDetailsSubscription.unsubscribe(); 
      //console.log('Order details subscription has been unsubscribed');
    }
  }
}
