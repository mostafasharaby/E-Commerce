import { Injectable } from '@angular/core';
import { IProduct } from '../../models/IProduct';
import { BehaviorSubject  } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SortingService {

  constructor() { }

  private sortItems: BehaviorSubject<string> = new BehaviorSubject< string>('');
  sortTerm$ = this.sortItems.asObservable();

  private sortItemsByName: BehaviorSubject<string> = new BehaviorSubject< string>('');
  sortTermByName$ = this.sortItemsByName.asObservable();
  
  private sortItemsByRate: BehaviorSubject<string> = new BehaviorSubject< string>('');
  sortTermByRate$ = this.sortItemsByRate.asObservable();
  
  setSortOrder(order: string) {
    this.sortItems.next(order);
    console.log("form sort service " ,order )
  }
  setSortOrderByName(order: string) {
    this.sortItemsByName.next(order);
  }
  setSortOrderByRate(order: string) {
    this.sortItemsByRate.next(order);
  }

  sortByPrice(products: IProduct[], order: string): IProduct[] {
    if (order === 'asc') {
      return products.sort((a, b) => a.price - b.price);
    } else if (order === 'desc') {
      return products.sort((a, b) => b.price - a.price);
    } else {
      return products; 
    }
  }
  sortByName(products: IProduct[], order: string): IProduct[] {
    if (order === 'asc') {
      return products.sort((a, b) => a.name.localeCompare(b.name));
    } else if (order === 'desc') {
      return products.sort((a, b) => b.name.localeCompare(a.name));
    } else {
      return products; 
    }
  }

  sortByRate(products: IProduct[], order: string): IProduct[] {
    if (order === 'asc') {
      return products.sort((a, b) => a.ratings.rate!- b.ratings.rate!);
    } else if (order === 'desc') {
      return products.sort((a, b) => b.ratings.rate!- a.ratings.rate!);
    } else {
      return products; 
    }
  }



}
