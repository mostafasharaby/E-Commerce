/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { PriceFilterService } from './PriceFilter.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
describe('Service: PriceFilter', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PriceFilterService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should ...', inject([PriceFilterService], (service: PriceFilterService) => {
    expect(service).toBeTruthy();
  }));
});
