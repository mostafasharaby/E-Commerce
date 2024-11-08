/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { FilterService } from './Filter.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
describe('Service: Filter', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FilterService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should ...', inject([FilterService], (service: FilterService) => {
    expect(service).toBeTruthy();
  }));
});
