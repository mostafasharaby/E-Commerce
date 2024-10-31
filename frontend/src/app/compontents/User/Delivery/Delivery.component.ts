import { Component, Input, OnInit, Output ,EventEmitter } from '@angular/core';
import { DeliveryService } from '../../../Services/Delivery/Delivery.service';
import { Delivery } from '../../../Models/IProduct';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {
  deliveries: Delivery[] = [];
  newDelivery: Delivery = {
    recipientName: '',
    email: '',
    country: '',
    city: '',
    phoneNumber: '',
    deliveryCost: 0
  };
  selectedDelivery: Delivery | null = null;

  constructor(private fb: FormBuilder , private deliveryService: DeliveryService) {
  }

  @Input() checkoutForm!: FormGroup;
  @Output() deliveryReady = new EventEmitter<Delivery>();
  get recipientName() { return this.checkoutForm.get('recipientName'); }
  get email() { return this.checkoutForm.get('email'); }
  get country() { return this.checkoutForm.get('country'); }
  get city() { return this.checkoutForm.get('city'); }
  get phoneNumber() { return this.checkoutForm.get('phoneNumber'); }

  private subscriptions: Subscription[] = []; 
  ngOnInit() {
    this.loadDeliveries();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  loadDeliveries() {
    const subscription =  this.deliveryService.getDeliveries().subscribe(data => {
      this.deliveries = data;
     // console.log("deliveries loaded ", this.deliveries);
    });
    this.subscriptions.push(subscription);
  }

  prepareDelivery() {

    console.log("preparing delivery");
    if (this.checkoutForm.valid) {
      // Construct a new Delivery object from form values
      const newDelivery: Delivery = {
        recipientName: this.checkoutForm.get('recipientName')?.value,
        email: this.checkoutForm.get('email')?.value,
        country: this.checkoutForm.get('country')?.value,
        city: this.checkoutForm.get('city')?.value,
        phoneNumber: this.checkoutForm.get('phoneNumber')?.value,
        deliveryCost: 0 // You can handle this logic based on your business rules
      };
      console.log( "newDelivery", newDelivery);
      this.deliveryService.setDeliveryData(newDelivery);
      // Emit the delivery data to the parent
      //this.deliveryReady.emit(newDelivery);
    } else {
      this.checkoutForm.markAllAsTouched(); // Show validation errors if form is invalid
    }
  }


  editDelivery(delivery: Delivery) {
    this.selectedDelivery = { ...delivery };  // Make a copy of the selected delivery
  }

  // Update the selected delivery
  updateDelivery() {
    if (this.selectedDelivery && this.selectedDelivery.deliveryId) {
      this.deliveryService.updateDelivery(this.selectedDelivery.deliveryId, this.selectedDelivery).subscribe(() => {
        const index = this.deliveries.findIndex(d => d.deliveryId === this.selectedDelivery!.deliveryId);
        if (index !== -1) {
          this.deliveries[index] = { ...this.selectedDelivery! };  // Update the list
          this.selectedDelivery = null;  // Reset the selected delivery
        }
      });
    }
  }

  // Delete a delivery
  deleteDelivery(id: string) {
    this.deliveryService.deleteDelivery(id).subscribe(() => {
      this.deliveries = this.deliveries.filter(d => d.deliveryId !== id);
    });
  }
}
