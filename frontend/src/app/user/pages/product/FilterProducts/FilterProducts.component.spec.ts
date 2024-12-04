/* tslint:disable:no-unused-variable */
import {  ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FilterProductsComponent } from './FilterProducts.component';

describe('FilterProductsComponent', () => {
  let component: FilterProductsComponent;
  let fixture: ComponentFixture<FilterProductsComponent>;

  beforeEach((async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
