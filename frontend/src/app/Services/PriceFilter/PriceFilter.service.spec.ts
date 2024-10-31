/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PriceFilterService } from './PriceFilter.service';

describe('Service: PriceFilter', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PriceFilterService]
    });
  });

  it('should ...', inject([PriceFilterService], (service: PriceFilterService) => {
    expect(service).toBeTruthy();
  }));
});
