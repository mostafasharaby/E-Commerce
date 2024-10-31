/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NotificationHandlerService } from './NotificationHandler.service';

describe('Service: NotificationHandler', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotificationHandlerService]
    });
  });

  it('should ...', inject([NotificationHandlerService], (service: NotificationHandlerService) => {
    expect(service).toBeTruthy();
  }));
});
