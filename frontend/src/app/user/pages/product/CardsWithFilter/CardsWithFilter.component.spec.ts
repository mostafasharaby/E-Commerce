/* tslint:disable:no-unused-variable */
import {  ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CardsWithFilterComponent } from './CardsWithFilter.component';

describe('CardsWithFilterComponent', () => {
  let component: CardsWithFilterComponent;
  let fixture: ComponentFixture<CardsWithFilterComponent>;

  beforeEach((async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardsWithFilterComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsWithFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
