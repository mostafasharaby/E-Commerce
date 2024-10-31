/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SnakebarService } from './Snakebar.service';

describe('Service: Snakebar', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SnakebarService]
    });
  });

  it('should ...', inject([SnakebarService], (service: SnakebarService) => {
    expect(service).toBeTruthy();
  }));
});
