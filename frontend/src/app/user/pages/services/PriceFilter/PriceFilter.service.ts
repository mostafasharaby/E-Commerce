import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IProduct } from '../../models/IProduct';

@Injectable({
  providedIn: 'root'
})
export class PriceFilterService {
  // private filteredProducts = new BehaviorSubject<IProduct[]>([]); // Store filtered products

  // filteredProducts$ = this.filteredProducts.asObservable(); // Expose observable for the filtered products

  // filterProductsByPrice(products: IProduct[], selectedRange: number[]): void {
  //   const [minPrice, maxPrice] = selectedRange;

  //   const filtered = products.filter(product => {
  //     return product.price >= minPrice && product.price <= maxPrice;
  //   });

  //   this.filteredProducts.next(filtered); // Emit the filtered products
  // }

  private filterSubject = new BehaviorSubject<{ event: any, type: string } | null>(null);
  currentFilter = this.filterSubject.asObservable();

  // Method to update the filter
  setFilter(filterData: { event: any, type: string }) {
    this.filterSubject.next(filterData);
  }
  
}
