/* tslint:disable:no-unused-variable */
import {  ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FinishPaymentComponent } from './FinishPayment.component';

describe('FinishPaymentComponent', () => {
  let component: FinishPaymentComponent;
  let fixture: ComponentFixture<FinishPaymentComponent>;

  beforeEach((async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinishPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
