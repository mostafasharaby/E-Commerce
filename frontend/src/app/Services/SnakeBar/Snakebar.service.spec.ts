/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { SnakebarService } from './Snakebar.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
describe('Service: Snakebar', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SnakebarService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should ...', inject([SnakebarService], (service: SnakebarService) => {
    expect(service).toBeTruthy();
  }));
});
