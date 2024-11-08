/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { UserAuthenticationService } from './UserAuthentication.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
describe('Service: UserAuthentication', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserAuthenticationService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should ...', inject([UserAuthenticationService], (service: UserAuthenticationService) => {
    expect(service).toBeTruthy();
  }));
});
