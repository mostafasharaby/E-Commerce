/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HandelErrorsService } from './HandelErrors.service';

describe('Service: HandelErrors', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HandelErrorsService]
    });
  });

  it('should ...', inject([HandelErrorsService], (service: HandelErrorsService) => {
    expect(service).toBeTruthy();
  }));
});
