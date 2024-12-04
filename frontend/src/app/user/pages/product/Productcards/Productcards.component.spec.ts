/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ProductcardsComponent } from './Productcards.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
describe('ProductcardsComponent', () => {
  let component: ProductcardsComponent;
  let fixture: ComponentFixture<ProductcardsComponent>;

  beforeEach((async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductcardsComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductcardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
