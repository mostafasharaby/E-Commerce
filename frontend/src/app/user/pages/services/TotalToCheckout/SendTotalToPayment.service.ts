import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SendTotalToPaymentService {

  private sendTotal: BehaviorSubject<number> = new BehaviorSubject< number>(0);
  sendtot$ = this.sendTotal.asObservable();

  sendTotalPrice(total: number) {
    this.sendTotal.next(total);
  }
constructor() { }

}
