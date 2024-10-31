/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TotalToFinshPaymentService } from './TotalToFinshPayment.service';

describe('Service: TotalToFinshPayment', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TotalToFinshPaymentService]
    });
  });

  it('should ...', inject([TotalToFinshPaymentService], (service: TotalToFinshPaymentService) => {
    expect(service).toBeTruthy();
  }));
});
