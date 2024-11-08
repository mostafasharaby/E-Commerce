/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { NotificationHandlerService } from './NotificationHandler.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
describe('Service: NotificationHandler', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotificationHandlerService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should ...', inject([NotificationHandlerService], (service: NotificationHandlerService) => {
    expect(service).toBeTruthy();
  }));
});
