/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { DeliveryService } from './Delivery.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
describe('Service: Delivery', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeliveryService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should ...', inject([DeliveryService], (service: DeliveryService) => {
    expect(service).toBeTruthy();
  }));
});
