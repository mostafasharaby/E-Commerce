/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { CartService } from './Cart.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
describe('Service: Cart', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CartService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should ...', inject([CartService], (service: CartService) => {
    expect(service).toBeTruthy();
  }));
});
