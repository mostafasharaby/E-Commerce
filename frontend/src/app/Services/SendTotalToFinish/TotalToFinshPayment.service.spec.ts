/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { TotalToFinshPaymentService } from './TotalToFinshPayment.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
describe('Service: TotalToFinshPayment', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TotalToFinshPaymentService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should ...', inject([TotalToFinshPaymentService], (service: TotalToFinshPaymentService) => {
    expect(service).toBeTruthy();
  }));
});
