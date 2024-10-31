import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../../Models/IProduct';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ProductsService } from '../../../Services/Products/Products.service';
import { ActivatedRoute, Params } from '@angular/router';
import { FilterService } from '../../../Services/FilterProduct/Filter.service';

@Component({
  selector: 'app-CardsWithFilter',
  templateUrl: './CardsWithFilter.component.html',
  styleUrls: ['./CardsWithFilter.component.css']
})
export class CardsWithFilterComponent implements OnInit {
  cloneOfProducts: IProduct[] = [];
  products: IProduct[] = [];
  category: number = 0;
  isFilter = false;
  error!: string;
  subsFilterProducts!: Subscription;

  selectedFilter: { rating: BehaviorSubject<number | null>; categoryId: BehaviorSubject<number | null> } = {
    rating: new BehaviorSubject<number | null>(null),
    categoryId: new BehaviorSubject<number | null>(null),

  }
  ratingList: boolean[] = [];

  constructor(
    private productService: ProductsService,
    ) { }

  ngOnInit(): void {
    this.getProductsByCategory();
  //  this.handleFilter();
  }

  getProductsByCategory(): IProduct[] {
  
  
      this.category = 1          
      this.productService.getProductById(this.category).subscribe((data) => {    
        this.products[0]= data;
        console.log("data ", data);
      })
     

    return this.products;
  }

  


  onFilter(value: boolean) {
    this.isFilter = value;
  }





}
