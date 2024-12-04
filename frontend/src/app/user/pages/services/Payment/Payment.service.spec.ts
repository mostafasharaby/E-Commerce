/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { PaymentService } from './Payment.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
describe('Service: Payment', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PaymentService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should ...', inject([PaymentService], (service: PaymentService) => {
    expect(service).toBeTruthy();
  }));
});
