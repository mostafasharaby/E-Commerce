import { Injectable, Input, OnInit } from '@angular/core';
import { cartViewModel, ICategory, ICategoryList, IProduct } from '../../Models/IProduct';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductsService } from '../Products/Products.service';
@Injectable({
  providedIn: 'root'
})
export class StaticProductService  {

  categorylist !: ICategoryList[];
  ProductChangesByCatID: IProduct[] = [];

  selectedCategoryIds: number[] = [];
  private selectedCategoryIdsSource = new BehaviorSubject<number[]>([]);
  selectedCategoryIds$ = this.selectedCategoryIdsSource.asObservable();
  changeCategoryIds(categoryIds: number[]) {
    this.selectedCategoryIdsSource.next(categoryIds);
  }


  selectedCategoryId: number = 0;
  private selectedCategoryIdSource = new BehaviorSubject<number>(0);
  selectedCategoryId$ = this.selectedCategoryIdSource.asObservable();
  changeCategoryId(categoryId: number) {
    this.selectedCategoryIdSource.next(categoryId);
  }
  
  public selectedCategoryType = new BehaviorSubject<string>('');
  selectedType$ = this.selectedCategoryType.asObservable();
  changeCategoryId2(categoryId: number, type: string = '') {
    this.selectedCategoryIdSource.next(categoryId);
    this.selectedCategoryType.next(type); // Store category type
    console.log("selectedtyppppe" , type)
  }
  

  constructor(private proService: ProductsService) {  
  }

  mapToCartViewModel(product: IProduct): cartViewModel {
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      count: product.count,
      categoryID: product.categoryID,
      quantity: product.quantity,
      imgUrl: product.imgUrl,
      title: product.title,
      description: product.description,
      category: product.category,
      type: product.type,
      sizes: product.sizes,
      size: product.size,
      images: product.images,
      stock: product.stock || '', // Default to  an empty string if undefined
      prevprice: product.prevPrice || 0, // Default to 0 if undefined
      discount: product.discount || 0, // Default to 0 if undefined
      totalprice: product.totalprice || 0, // Default to 0 if undefined
      ratings: {
        rate: product.ratings.rate || 0,
        count: product.ratings.count || 0 // Default to 0 if undefined
      }
    };
  }


}
