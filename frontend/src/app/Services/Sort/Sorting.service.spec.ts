/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SortingService } from './Sorting.service';

describe('Service: Sorting', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SortingService]
    });
  });

  it('should ...', inject([SortingService], (service: SortingService) => {
    expect(service).toBeTruthy();
  }));
});
