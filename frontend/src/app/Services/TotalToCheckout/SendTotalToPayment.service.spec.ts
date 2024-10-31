/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SendTotalToPaymentService } from './SendTotalToPayment.service';

describe('Service: SendTotalToPayment', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SendTotalToPaymentService]
    });
  });

  it('should ...', inject([SendTotalToPaymentService], (service: SendTotalToPaymentService) => {
    expect(service).toBeTruthy();
  }));
});
