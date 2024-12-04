/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { SearchService } from './Search.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
describe('Service: Search', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should ...', inject([SearchService], (service: SearchService) => {
    expect(service).toBeTruthy();
  }));
});
