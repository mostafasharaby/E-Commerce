/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { HandelErrorsService } from './HandelErrors.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
describe('Service: HandelErrors', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HandelErrorsService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should ...', inject([HandelErrorsService], (service: HandelErrorsService) => {
    expect(service).toBeTruthy();
  }));
});
