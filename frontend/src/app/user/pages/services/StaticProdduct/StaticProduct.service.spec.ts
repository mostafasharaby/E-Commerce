/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { StaticProductService } from './StaticProduct.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
describe('Service: StaticProduct', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StaticProductService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should ...', inject([StaticProductService], (service: StaticProductService) => {
    expect(service).toBeTruthy();
  }));
});
