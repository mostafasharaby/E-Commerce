/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { SortingService } from './Sorting.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
describe('Service: Sorting', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SortingService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should ...', inject([SortingService], (service: SortingService) => {
    expect(service).toBeTruthy();
  }));
});
