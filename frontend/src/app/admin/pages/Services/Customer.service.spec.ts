/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { CustomerService } from '../Customers/customer-service/Customer.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Service: Customer', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomerService],
      imports: [ReactiveFormsModule,  HttpClientTestingModule]
    });
  });

  it('should ...', inject([CustomerService], (service: CustomerService) => {
    expect(service).toBeTruthy();
  }));
});
