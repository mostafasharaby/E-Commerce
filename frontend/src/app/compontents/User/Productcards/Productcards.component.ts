import { Component, OnInit } from '@angular/core';
import { StaticProductService } from '../../../Services/StaticProdduct/StaticProduct.service';
import { ProductsService } from '../../../Services/Products/Products.service';
import { CartService } from '../../../Services/Cart/Cart.service';
import { IProduct } from '../../../Models/IProduct';
import { WishlistService } from '../../../Services/Wish/Wishlist.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { SnakebarService } from '../../../Services/SnakeBar/Snakebar.service';
import { Subscription } from 'rxjs';
import { SearchService } from '../../../Services/Search/Search.service';
import { SortingService } from '../../../Services/Sort/Sorting.service';
import { PriceFilterService } from '../../../Services/PriceFilter/PriceFilter.service';

@Component({
  selector: 'app-Productcards',
  templateUrl: './Productcards.component.html',
  styleUrls: ['./Productcards.component.css']
})
//npm install json-server   npx json-server db.json
export class ProductcardsComponent implements OnInit {
  productId: number = 0;
  cards !: IProduct[];
  date: Date = new Date();
  chunkedCards: any[][] = [];
  checkSelectedItems: { [key: string]: boolean } = {};
  checkItemsInWishList: { [key: string]: boolean } = {};
  checkItemsInCart: { [key: string]: boolean } = {};
  TotalPrice: number = 0;
  selectedCategoryId: number = 0;
  pricessRange!: number[];
  checkExistElementsMatch: boolean = true;
  searchResult: boolean = true;
  selectedStarRating: number = 0;

  searchItem: string = ''; // This will store the search input
  filteredCards: any[] = [];
  private subscriptions: Subscription[] = [];

  sortOrder: string = 'asc';


  constructor(private staticproduct: StaticProductService,
    private wishlistService: WishlistService,
    private proService: ProductsService,
    private cartService: CartService,
    private searchService: SearchService,
    private router: Router,
    private staticService: StaticProductService,
    private route: ActivatedRoute,
    private snakeaBar: SnakebarService,
    private sortingService: SortingService,
    private priceFilterService: PriceFilterService) { }

    type: string = '';
  categoryItems: any;
  ngOnInit(): void {

  
    this.staticService.selectedType$.subscribe((type) => {
      this.type = type;
      console.log("typppppe ", this.type);
    });


    this.subscriptions.push(

      this.sortingService.sortTerm$.subscribe(order => {
        this.sortOrder = order;
        // console.log("Received sort order:", order);
        this.sortProductsByPrice(order);
        // this.sortProductsByName(order);
      }),

      this.sortingService.sortTermByName$.subscribe(order => {
        this.sortOrder = order;
        this.sortProductsByName(order);
      }),

      this.sortingService.sortTermByRate$.subscribe(order => {
        this.sortOrder = order;
        this.sortProductsByRate(order);
      }),



      this.staticproduct.selectedCategoryId$.subscribe(categoryId => {
        this.selectedCategoryId = categoryId;
        //  this.filterProducts();
      }),


      this.route.queryParams.subscribe(params => {
        this.productId = +params['id']; //  + to convert string to number
      }),


      this.route.params.subscribe(params => {
        const title = params['title'];
        //console.log("title " +title);
        if (title) {
          this.getCategoryItems2(title);                      // i changed the title
        } else {
          console.warn('Title parameter not found in URL');
        }
      }),

      this.priceFilterService.currentFilter.subscribe(filterData => {
        if (filterData) {
          this.applyFilter(filterData.event, filterData.type);
        }
      })
    )


  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }


  filterByPrice(event: any) {
    const priceRangeId = +event.target.value;
    let selectedRange: number[] = this.getPriceRangeById(priceRangeId);
    if (event.target.checked) {     
      const checkExistAfter = this.filteredCards.some(card => card.id === this.selectedCategoryId && card.type === this.type);
      console.log("before price filter ", this.filteredCards  , this.type );
     
     if(this.type==='' || this.type==='all')   this.filteredCards = this.cards.filter(product => product.price >= selectedRange[0] && product.price <= selectedRange[1] ) ;
     else  this.filteredCards = this.cards.filter(product => product.price >= selectedRange[0] && product.price <= selectedRange[1] && product.type === this.type ) ;
     
     console.log("after price filter ", this.filteredCards);

      //console.log(this.filteredCards.some(card => card.id === this.selectedCategoryId));
      if (this.filteredCards.length == 0) {
        this.checkExistElementsMatch = false;
      } else {
        this.checkExistElementsMatch = true;
      }
      //console.log("last filter " ,   this.filteredCards);
    } else {
      // Reset or remove price filter
      this.filteredCards = [...this.cards];
      this.checkExistElementsMatch = false;
     // this.checkExistElementsMatch = this.filteredCards.length > 0; 
    }
    //this.checkExistElementsMatch = this.filteredCards.length > 0;
    console.log("checked filteredCards", this.filteredCards)
    console.log("checkExistElementsMatch " , this.checkExistElementsMatch);
  }

  applyFilter(event: any, type: string) {
    if (type === 'price') {
      this.filterByPrice(event);
    } else if (type === 'all') {
      this.filteredCards = this.cards;
      this.checkExistElementsMatch = this.filteredCards.length > 0;
    }

    //console.log("event changed " ,type);
  }


  getPriceRangeById(priceRangeId: number): number[] {
    const priceRanges: Record<number, number[]> = {
      1: [0, 100],
      2: [101, 500],
      3: [501, 1000],
      4: [1001, Number.MAX_SAFE_INTEGER], // Handle "Above $1000"
    };
    return priceRanges[priceRangeId] || [];
  }



  getCategoryItems2(title: string) {
    this.proService.getCategoryByTitle2(title).subscribe(
      (data) => {
        const categories = data.filter((cat: any) => cat.title.toLowerCase() === title.toLowerCase());
       console.log("category: ", categories);
        if (categories) {

          this.categoryItems = categories
          this.cards = this.categoryItems;  // Assigning the fetched items to cards
          this.filteredCards = this.cards;
          this.checkExistElementsMatch = this.filteredCards.length > 0;
           console.log("filtered cards: ", this.filteredCards  );
          // this.checkExistElementsMatch = this.filteredCards.length > 0;
          //console.log("filtered length : ", this.filteredCards.length  );
          this.searchService.searchTerm$.subscribe((data) => {
            this.search(data);
            //console.log("data: ", this.searchService.searchTerm$);
          });

          //console.log("categoryItems: ", this.categoryItems);
          //  console.log("card Id : ", this.cards[0].categoryID);
          // console.log("path : ", category.path.split("/").pop());
        } else {
          console.warn(`Category with title ${title} not found`);
        }
      },
      (error) => {
        console.error('Error fetching category data', error);
      }
    );
  }



  BuyNow(product: IProduct) {
    product.count = 1;
    if (product.quantity > 0) {
      //console.log("this is pp" + product.id);
      this.checkSelectedItems[product.name] = true;
      this.TotalPrice += (product.price * product.count);
      product.totalprice = product.price;
      product.quantity--;
      //console.log("JSON.stringif " , JSON.stringify(product, null, 2))
      this.cartService.addCartItem2(product);
      this.snakeaBar.showSnakeBar(`'${product.name}' Added to Cart successfully`);
    }
  }

  onStarRatingChange(rating: number) {
    this.selectedStarRating = rating;
    //  this.filterProducts();
  }

  getFilledStars(rate: number): number {
    return Math.floor(rate);
  }

  getEmptyStars(rate: number): number {
    return 6 - Math.ceil(rate);
  }

  addToWishList(product: IProduct) {
    //this.wishlistService.addToWishlist(product);
    this.wishlistService.addToWishlist2(product);
    // console.log("product added to wish " + product.name);
    if (this.checkItemsInWishList[product.name]) {
      this.snakeaBar.showSnakeBar(`'${product.name}' already in  Wish list`);
    } else {
      this.snakeaBar.showSnakeBar(`'${product.name}' Added to  Wish list successfully`);
      this.checkItemsInWishList[product.name] = true;
    }

  }

  routeToDetails(productId: number) {
    this.router.navigate(['/product/productDetails', productId]);
    // console.log("routeToDetails", productId);
  }

  search(searchItem: any) {
    this.filteredCards = this.cards.filter(product =>
      product.name.toLowerCase().includes(searchItem),
      //console.log("search ", this.filteredCards)
    );
    if (this.filteredCards.length == 0) {
      this.searchResult = false;
    } else {
      this.searchResult = true;
    }
  }

  sortProductsByPrice(order: string): void {
    this.filteredCards = this.sortingService.sortByPrice(this.filteredCards, order); // Sorting products array
    // console.log("sort ",order
  }
  sortProductsByName(order: string): void {
    this.filteredCards = this.sortingService.sortByName(this.filteredCards, order); // Sorting products array
  }

  sortProductsByRate(order: string): void {
    this.filteredCards = this.sortingService.sortByRate(this.filteredCards, order); // Sorting products array
  }

}
