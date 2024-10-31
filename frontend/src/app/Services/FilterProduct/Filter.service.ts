import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import { CategoryFilter, IProduct } from '../../Models/IProduct';
import { ProductsService } from '../Products/Products.service';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  
  filterList=new BehaviorSubject<CategoryFilter[]>([]);
  products!:IProduct[];
  category:number = 0;;
  cloneOfProducts!:IProduct[];
  constructor(private productService:ProductsService) { }



}