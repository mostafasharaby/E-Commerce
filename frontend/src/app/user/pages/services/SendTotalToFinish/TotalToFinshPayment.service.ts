import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TotalToFinshPaymentService {

constructor() { }
private sendTotalToFinish: BehaviorSubject<number> = new BehaviorSubject< number>(0);
sendtoFinish$ = this.sendTotalToFinish.asObservable();

sendTotalPrice(total: number) {
  this.sendTotalToFinish.next(total);
}
}
