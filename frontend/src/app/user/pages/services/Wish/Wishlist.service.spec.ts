/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { WishlistService } from './Wishlist.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
describe('Service: Wishlist', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WishlistService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should ...', inject([WishlistService], (service: WishlistService) => {
    expect(service).toBeTruthy();
  }));
});
