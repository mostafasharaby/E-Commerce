/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CheckoutComponent } from './Checkout.component';
import { DeliveryService } from '../../services/Delivery/Delivery.service';


describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;

  beforeEach((async () => {
     await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Import HttpClientTestingModule to provide HttpClient
      declarations: [CheckoutComponent],
      providers: [DeliveryService]         // Provide DeliveryService if needed
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
