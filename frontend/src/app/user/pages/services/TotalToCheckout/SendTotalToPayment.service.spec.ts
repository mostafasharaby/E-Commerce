/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { SendTotalToPaymentService } from './SendTotalToPayment.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
describe('Service: SendTotalToPayment', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SendTotalToPaymentService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should ...', inject([SendTotalToPaymentService], (service: SendTotalToPaymentService) => {
    expect(service).toBeTruthy();
  }));
});
