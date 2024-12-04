/* tslint:disable:no-unused-variable */
import {  ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AddProductComponent } from './AddProduct.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

describe('AddProductComponent', () => {
  let component: AddProductComponent;
  let fixture: ComponentFixture<AddProductComponent>;
  let fb: FormBuilder;
  beforeEach((async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProductComponent ],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [FormBuilder]
    })
    .compileComponents();
    fb = TestBed.inject(FormBuilder);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
