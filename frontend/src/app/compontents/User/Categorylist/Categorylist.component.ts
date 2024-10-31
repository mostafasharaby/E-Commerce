import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../Services/Products/Products.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-Categorylist',
  templateUrl: './Categorylist.component.html',
  styleUrls: ['./Categorylist.component.css']
})
export class CategorylistComponent implements OnInit {
  categoryItems: any;

  constructor(private categoryService: ProductsService) { }

  // ngOnInit() {
  //   this.getCategoryItems('Men');
  // }


  // getCategoryItems(title: string) {
  //   this.categoryService.getCategoryByTitle(title).subscribe(
  //     (data) => {

  //       const category = data.find((cat:any) => cat.title === title);
  //      // console.log("category: ", category);
  //       if (category) {
  //         this.categoryItems = category.items; 
  //       } else {
  //         console.warn(`Category with title ${title} not found`);
  //       }
  //     },
  //     (error) => {
  //       console.error('Error fetching category data', error);
  //     }
  //   );
  // }

  ngOnInit() {
    this.getCategoryItems2('Men');
  }
  private subscription: Subscription | undefined;
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


  getCategoryItems2(title: string) {
    this.subscription = this.categoryService.getCategoryByTitle2(title).subscribe(
      (data) => {

        const category = data.find((cat: any) => cat.title === title);
        // console.log("category: ", category);
        if (category) {
          this.categoryItems = category.items;
        } else {
          console.warn(`Category with title ${title} not found`);
        }
      },
      (error) => {
        console.error('Error fetching category data', error);
      }
    );
  }


}
