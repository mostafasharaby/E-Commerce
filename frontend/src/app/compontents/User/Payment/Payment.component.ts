import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../Services/Order/Order.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Delivery, Delivery2, IOrderDetails, IOrderDetails22 } from '../../../Models/IProduct';
import { UserAuthenticationService } from '../../../Services/userAuthentication/UserAuthentication.service';
import { Router } from '@angular/router';
import { SnakebarService } from '../../../Services/SnakeBar/Snakebar.service';
import { CartService } from '../../../Services/Cart/Cart.service';
import { TotalToFinshPaymentService } from '../../../Services/SendTotalToFinish/TotalToFinshPayment.service';
import { DeliveryService } from '../../../Services/Delivery/Delivery.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-Payment',
  templateUrl: './Payment.component.html',
  styleUrls: ['./Payment.component.css']
})

export class PaymentComponent implements OnInit {
  checkoutForm: FormGroup;
  isLoggedIn: boolean = false;
  nOfItems: number = 0;

  constructor(
    private orderService: OrderService,
    private authService: UserAuthenticationService,
    private route: Router,
    private snakeBar: SnakebarService,
    private fb: FormBuilder,
    private cartService: CartService,
    private finalTotal: TotalToFinshPaymentService,
    private deliveryService: DeliveryService
  ) {
    this.checkoutForm = this.fb.group({
      cardHolderName: ['', [Validators.required, Validators.minLength(3)]],
      postalCode: ['', [Validators.required]],
      cardNumber: ['', [Validators.required]],
      expiryDate: ['', [Validators.required]],
      cvv: ['', [Validators.required]],
    });
  }

  get cardHolderName() { return this.checkoutForm.get('cardHolderName'); }
  get postalCode() { return this.checkoutForm.get('postalCode'); }
  get cardNumber() { return this.checkoutForm.get('cardNumber'); }
  get expiryDate() { return this.checkoutForm.get('expiryDate'); }
  get cvv() { return this.checkoutForm.get('cvv'); }

  orderDetails: IOrderDetails = {
    total: 0
  };
  sendTot: number = 0;

  deliveryData: Delivery2 | null = null;
  private subscriptions: Subscription[] = [];
  ngOnInit() {

    this.subscriptions.push(
    this.authService.getloggedStatus().subscribe(status => {
      this.isLoggedIn = status;
    }),

    this.finalTotal.sendtoFinish$.subscribe((tot) => {
      this.orderDetails.total = tot;
      this.sendTot = tot;
      // console.log("in finalTotal " , this.orderDetails.total );
    }),

    this.deliveryService.deliveryData$.subscribe((delivery) => {
      this.deliveryData = delivery;
      console.log("deliveryData ", this.deliveryData)
    })
  );

  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  onSubmit(event: Event) {
    //event.preventDefault();
    if (this.checkoutForm.valid) {
      //console.log('Form Data:', this.checkoutForm.value);
      this.postOrderDetails();
      this.route.navigate(['/completepayment'])
    } else {
      this.checkoutForm.markAllAsTouched();
      console.log('Form is invalid');
    }
  }

  clearCart() {
    this.cartService.emptyCartItems();
    console.log('Cart cleared');
  }

  postOrderDetails() {
    if (this.isLoggedIn) {
      
      const orderData: IOrderDetails22 = {
        total: this.sendTot,
        delivery: this.deliveryData
      };

      this.orderService.postOrderDetails2(orderData).subscribe(response => {
        console.log('Order and Delivery created successfully:', response);
        this.snakeBar.showSnakeBar("operation completed successfully");
        this.route.navigate(['/completepayment']);
        this.clearCart();
      });
    } else {
      this.snakeBar.showSnakeBar("Please login first to continue...");
      this.route.navigate(['/auth/Login']);
    }
  }



}
