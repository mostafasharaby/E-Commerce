import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../../Services/Wish/Wishlist.service';
import { IProduct, IWishItem } from '../../../Models/IProduct';
import { CartService } from '../../../Services/Cart/Cart.service';
import { StaticProductService } from '../../../Services/StaticProdduct/StaticProduct.service';
import { Router } from '@angular/router';
import { SnakebarService } from '../../../Services/SnakeBar/Snakebar.service';
import { Subscription } from 'rxjs';
interface WishlistItem {
  name:string;
  price:number;
  count:number;
  imgUrl?:string;
  quantity:number;
  categoryID:number;
  id?:number;
  title?:string;
  description?: string;
  category?: string;
  type: string;
  sizes?: string[];
  size?:string;
  images?: string[];
  stock: string;
  prevprice:number;
  discount?:number;
  totalprice?:number;
  ratings: {
    rate: number;
    count: number;
  }
}


@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  constructor(public wishlistService: WishlistService,
    private cartService: CartService,
    private staticProduct: StaticProductService,
    private router: Router,
    private snakeaBar: SnakebarService) { }
    private wishlistSubscription!: Subscription;

  ngOnInit() {
    this.loadWishlist();
  }
  ngOnDestroy() {
    if (this.wishlistSubscription) {
      this.wishlistSubscription.unsubscribe();
    }
  }


  isInWishlist: boolean = false;
  //wishlistItems: IProduct[] = [];
  wishlistItems: IWishItem[] = [];
  checkItemsInWishList: { [key: string]: boolean } = {};

  // toggleWishlist(): void {
  //   this.isInWishlist = !this.isInWishlist;
  // }

  // loadWishlist() {
  //   this.wishlistItems = this.wishlistService.getWishlist();
  // }

  loadWishlist(): void {
    this.wishlistSubscription = this.wishlistService.getWishlist2().subscribe({
      next: (items: IWishItem[]) => {
        this.wishlistItems = items;
        console.log( "wishlistItemssssss ",this.wishlistItems);
      },
      error: (err) => {
        console.error('Error loading wishlist: ', err);
      }
    });
  }

  addToWishList(wishlistItem: WishlistItem) {
    //this.wishlistService.addToWishlist(wishlistItem);
    this.wishlistService.addToWishlist2(wishlistItem);
    console.log("product added to wish " + wishlistItem);

    if (this.checkItemsInWishList[wishlistItem.name]) {
      this.snakeaBar.showSnakeBar(`'${wishlistItem.name}' already at  Wish list`);
    } else {
      this.snakeaBar.showSnakeBar(`'${wishlistItem.name}' Added to  Wish list successfully`);
      this.checkItemsInWishList[wishlistItem.name] = true;
    }
   
  }
  
  addToCart(product: IProduct) {
    product.count = 1;
    product.totalprice = product.count * product.price;
   // this.cartService.addCartItem(this.staticProduct.mapToCartViewModel(product));
   console.log("product in Wishlist added to Cart " + JSON.stringify(product, null, 2));
    this.cartService.addCartItem2(product);
    this.snakeaBar.showSnakeBar(`'${product.name}' Added to Cart successfully`);

    //console.log("details " + product.count , product.price , product.totalprice);
  }


  removeFromWishlist(itemId: number): void {
   // this.wishlistService.removeFromWishlist(itemId);
   console.log("deletedItemId ", );
    this.wishlistService.removeFromWishlist2(itemId);
    this.loadWishlist();
  }


  routeToDetails(productId: number) {
    this.router.navigate(['/product/productDetails', productId]);
   // console.log("routeToDetails", productId);
  }
  
  getFilledStars(rate: number): number {
    return Math.floor(rate);
  }

  getEmptyStars(rate: number): number {
    return 6 - Math.ceil(rate);
  }

}
