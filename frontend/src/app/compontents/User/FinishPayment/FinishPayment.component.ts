import { Component, OnInit } from '@angular/core';
import { SendTotalToPaymentService } from '../../../Services/TotalToCheckout/SendTotalToPayment.service';
import { TotalToFinshPaymentService } from '../../../Services/SendTotalToFinish/TotalToFinshPayment.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-FinishPayment',
  templateUrl: './FinishPayment.component.html',
  styleUrls: ['./FinishPayment.component.css']
})
export class FinishPaymentComponent implements OnInit {
  private subscription!: Subscription;
  constructor(private finalTotal: TotalToFinshPaymentService) {
  }
  today: number = Date.now();
  final: number = 0;

  ngOnInit() {
    this.subscription = this.finalTotal.sendtoFinish$.subscribe((total) => {
      this.final = total;
      //  console.log("in FinishPaymentComponent " , this.final);
    });
  }

  ngOnDestroy() {
    // Unsubscribe to prevent memory leaks
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
