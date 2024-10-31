import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ICategory, ICategoryList, IProduct } from '../../../Models/IProduct';
import { FilterService } from '../../../Services/FilterProduct/Filter.service';
import { StaticProductService } from '../../../Services/StaticProdduct/StaticProduct.service';
import { ActivatedRoute } from '@angular/router';
import { SortingService } from '../../../Services/Sort/Sorting.service';
import { PriceFilterService } from '../../../Services/PriceFilter/PriceFilter.service';

@Component({
  selector: 'app-FilterProducts',
  templateUrl: './FilterProducts.component.html',
  styleUrls: ['./FilterProducts.component.css']
})

export class FilterProductsComponent implements OnInit {
  @Output() onFilter = new EventEmitter<boolean>();
 // @Input() selectedFilter!: { rating: BehaviorSubject<number | null>, categoryId: BehaviorSubject<number | null> };
  selectedCategoryId: number = 0;
  catlist !: ICategory[];
  products !: IProduct[];
  categorylist !: ICategoryList;
  selectedCategories: number[] = [];
  selectedPrices: number[] = [];
  allSelected = true;
  filteredCategoryList!: ICategory[]; // Filtered list to display based on the URL
  sortOrder: string = 'asc';

  filteredProducts: IProduct[] = []; // for price 

  allPricesSelected = false;

  priceList: { rangeID: number; rangeLabel: string }[] = [
    { rangeID: 1, rangeLabel: '$0 - $100' },
    { rangeID: 2, rangeLabel: '$101 - $500' },
    { rangeID: 3, rangeLabel: '$501 - $1000' },
    { rangeID: 4, rangeLabel: 'Above $1000' },
  ];

  constructor(private filterService: FilterService,
    private service: StaticProductService,
    private route: ActivatedRoute,
    private sortingService: SortingService,
    private priceFilterService: PriceFilterService) {
    //this.catlist = service.catlist;
    // this.categorylist = service.categorylist;
    // console.log("categorylist..... " , this.categorylist);

    this.categorylist = {
      "Men": [
        { categoryID: 1, name: 'T-Shirt' },
        { categoryID: 2, name: 'Jeans' },
        { categoryID: 3, name: 'Suits' },
        { categoryID: 4, name: 'Shoes' },
        { categoryID: 5, name: 'Accessories' }
      ],
      "Electronics": [
        { categoryID: 1, name: 'Mobile' }, // updated
        { categoryID: 2, name: 'Laptop' },
        { categoryID: 3, name: 'Watch' },
        { categoryID: 4, name: 'Headphone' }
      ],

      "Women": [
        { categoryID: 1, name: 'Dresses' },
        { categoryID: 2, name: 'Handbags' },
        { categoryID: 3, name: 'Jewelry' },
        { categoryID: 4, name: 'Footwear' },
        { categoryID: 5, name: 'Scarves' }
      ],
      "Food": [
        { categoryID: 1, name: 'Fruits' },
        { categoryID: 2, name: 'Vegetables' },
        { categoryID: 3, name: 'Meat' },
        { categoryID: 4, name: 'Dairy Products' },
       // { categoryID: 5, name: 'Beverages' }
      ],
      "Drinks": [
        { categoryID: 1, name: 'Juices' },
        { categoryID: 2, name: 'Soft Drinks' },
        { categoryID: 4, name: 'Water' },
        { categoryID: 5, name: 'Tea & Coffee' }
      ],
      "Sports": [
        { categoryID: 1, name: 'Running Shoes' },
        { categoryID: 2, name: 'Fitness Equipment' },
        { categoryID: 3, name: 'Sportswear' },
        { categoryID: 4, name: 'Bicycles' },
      ]
    };
  }
  private subscription!: Subscription;
  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      const title = params['title'];
      // console.log("titleeeee: " + title);

      if (title) {
        this.getCategoryItems(title);
      } else {
        console.warn('Title parameter not found in URL');
      }
    });

  }


  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getCategoryKeys(): string[] {
    return Object.keys(this.categorylist);
  }



  getCategoryItems(title: string) {
    if (this.categorylist[title]) {
      this.filteredCategoryList = this.categorylist[title]; 
      //console.log("filteredCategoryList ", this.filteredCategoryList[0].name);
    } else {
      this.filteredCategoryList = []; // If no matching title, show nothing or handle default
    }
  }





  selectedCategory: number = 0;
  onCategorySelect(event: any, type: string) {
    const categoryId = +event.target.value;
    console.log("Category selected:", categoryId,  this.filteredCategoryList[categoryId-1].name);
    if (type === 'all') {
      this.selectedCategory = 0;
      this.allSelected = true;
      this.service.changeCategoryId(0);
    } else {
      this.selectedCategory = categoryId;
      this.allSelected = false;
      this.service.changeCategoryId(categoryId);
    }
    // console.log("Selected Category:", this.selectedCategory);
  }

  onCategorySelect2(event: any, type: string) {    
  
    if (type === 'all') {
      this.selectedCategory = 0;
      this.allSelected = true;
      this.service.changeCategoryId2(0,'all');
    } else {
      const categoryId = +event.target.value;
    const selectedCategory = this.filteredCategoryList[categoryId - 1]; // Adjust for zero-based index    
    console.log("Category selected:", categoryId, selectedCategory.name);
      this.selectedCategory = categoryId;
      this.allSelected = false;
      this.service.changeCategoryId2(categoryId, selectedCategory.name); // Pass category name (type)     
    }
  }




  selectedPrice: number = 0;
  onPriceSelect(event: any, type: string) {
    const priceId = +event.target.value;
    if (type === 'all') {
      this.selectedPrice = 0;
      this.allPricesSelected = true;
      this.priceFilterService.setFilter({ event, type: 'all' });
    } else {      
      this.selectedPrice = priceId;
      // console.log ("selectedPrice " , this.selectedPrice ) ;
      this.allPricesSelected = false;
      this.priceFilterService.setFilter({ event, type: 'price' });
    }
  }



  selectedSortOption: string = ":Default";
  sortProductsByPrice(sortOrder: string): void {
    this.sortingService.setSortOrder(sortOrder);
    this.selectedSortOption = `Price: ${sortOrder === 'asc' ? 'low to high' : 'high to low'}`;
    console.log("Sorting order set to:", this.selectedSortOption);
  }

  sortProductsByName(sortOrder: string): void {
    this.sortingService.setSortOrderByName(sortOrder);
    this.selectedSortOption = `Name: ${sortOrder === 'asc' ? 'A-Z' : 'Z-A'}`;
    console.log("Sorting order set to:", this.selectedSortOption);
  }

  sortProductsByRate(sortOrder: string): void {
    this.sortingService.setSortOrderByRate(sortOrder);
    this.selectedSortOption = `Rate: ${sortOrder === 'asc' ? 'low to high' : 'high to low'}`;
    console.log("Sorting order set to:", this.selectedSortOption);
  }

  onClose() {
    this.onFilter.emit(true);
  }

}