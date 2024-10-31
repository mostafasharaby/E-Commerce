/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AppSignalRService } from './AppSignalR.service';

describe('Service: AppSignalR', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppSignalRService]
    });
  });

  it('should ...', inject([AppSignalRService], (service: AppSignalRService) => {
    expect(service).toBeTruthy();
  }));
});
