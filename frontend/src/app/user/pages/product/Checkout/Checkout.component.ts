import { Component, OnInit } from '@angular/core';
import { SendTotalToPaymentService } from '../../services/TotalToCheckout/SendTotalToPayment.service';
import { TotalToFinshPaymentService } from '../../services/SendTotalToFinish/TotalToFinshPayment.service';
import { Delivery, Delivery2, IOrderDetails } from '../../models/IProduct';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeliveryService } from '../../services/Delivery/Delivery.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  gettotal: number = 0;
  discount: number = 10;
  Tax: number = 4;
  private subscriptions: Subscription[] = [];
  orderDetails: IOrderDetails = {
    total: 0,
    paymentId: 2,   // initial , will be changed later     
  };

  constructor(
    private totalService: SendTotalToPaymentService,
    private complete: TotalToFinshPaymentService,
    private route: Router,
    private finalTotal: TotalToFinshPaymentService,
    private fb: FormBuilder,
    private deliveryService: DeliveryService
  ) { }

  checkoutForm!: FormGroup;
  
  ngOnInit(): void {
    const totalSubscription =  this.totalService.sendtot$.subscribe((total) => {
      this.gettotal = total;
      console.log('in checking ', this.gettotal);
    });

    const finalTotalSubscription = this.finalTotal.sendtoFinish$.subscribe((tot) => {
      this.orderDetails.total = tot;
      // console.log("in finalTotal " , this.orderDetails.total );
    });
    this.subscriptions.push(finalTotalSubscription , totalSubscription)


    this.complete.sendTotalPrice(this.orderDetails.total);

    this.checkoutForm = this.fb.group({
      recipientName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      country: ['', Validators.required],
      city: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('[0-9]{3}[0-9]{4}[0-9]{4}')]]
    });
  }

  ngOnDestroy() {
    // Unsubscribe from all subscriptions to prevent memory leaks
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }


  calcTotal() {
    if (this.gettotal === 0) {
      this.Tax = 0;
    }
    let sum = this.gettotal - this.calcDiscountValue() + this.Tax;
    this.complete.sendTotalPrice(sum);
    // console.log('total ', this.complete.sendTotalPrice(sum));
    return sum;
  }

  calcDiscountValue() {
    return (this.discount / 100) * this.gettotal;
  }


  // onSubmit(event: Event) {
  //   event.preventDefault(); 

  //   if (this.checkoutForm.valid) {

  //     const delivery = {
  //       recipientName: this.checkoutForm.get('recipientName')?.value,
  //       email: this.checkoutForm.get('email')?.value,
  //       country: this.checkoutForm.get('country')?.value,
  //       city: this.checkoutForm.get('city')?.value,
  //       phoneNumber: this.checkoutForm.get('phoneNumber')?.value,
  //     };


  //     this.deliveryService.createDelivery(delivery).subscribe(data => {
  //       console.log('Delivery createDelivery:', data);       
  //       this.route.navigate(['payment']);
  //     }, error => {
  //       console.error('Error creating delivery:', error);       
  //     });

  //     console.log('Form submitted successfully!', this.checkoutForm.value);      
  //   } else {    
  //     this.checkoutForm.markAllAsTouched();
  //   }
  // }

  onSubmit(event: Event) {
    event.preventDefault();

    if (this.checkoutForm.valid) {

      const newDelivery: Delivery2 = {
        recipientName: this.checkoutForm.get('recipientName')?.value,
        email: this.checkoutForm.get('email')?.value,
        country: this.checkoutForm.get('country')?.value,
        city: this.checkoutForm.get('city')?.value,
        phoneNumber: this.checkoutForm.get('phoneNumber')?.value,
      };
      console.log( "newDelivery", newDelivery);
      this.deliveryService.setDeliveryData(newDelivery);


      
      this.route.navigate(['payment']);
      console.log('Form submitted successfully!', this.checkoutForm.value);
    } else {
      this.checkoutForm.markAllAsTouched();
    }
  }


  // s(delivery: Delivery) {
  //   this.deliveryService.createDelivery(delivery).subscribe(data => {
  //     console.log('Delivery createDelivery:', data);
  //     // Handle post-delivery actions, like resetting the form or navigating
  //   });
  // }

}
