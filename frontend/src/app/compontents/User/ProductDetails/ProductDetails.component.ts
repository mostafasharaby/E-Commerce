import { Component, Input, input, OnInit } from '@angular/core';
import { StaticProductService } from '../../../Services/StaticProdduct/StaticProduct.service';
import { Subject, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from '../../../Models/IProduct';
import { ProductsService } from '../../../Services/Products/Products.service';
import { WishlistService } from '../../../Services/Wish/Wishlist.service';
import { CartService } from '../../../Services/Cart/Cart.service';
import { SnakebarService } from '../../../Services/SnakeBar/Snakebar.service';
@Component({
  selector: 'app-ProductDetails',
  templateUrl: './ProductDetails.component.html',
  styleUrls: ['./ProductDetails.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productId: number = 0;
  prolist: IProduct | null = null;
  product!: IProduct;
  @Input() quantity: number = 1;
  prodId: number = 0;
  productIds: number[] = [];
  private paramMapSubscription?: Subscription;
  checkItemsInWishList: { [key: string]: boolean } = {};

  constructor(private staticProduct: StaticProductService, 
    private cartService: CartService,
    private wishlistService: WishlistService, 
    private proService: ProductsService,
    private route: ActivatedRoute, 
    private router: Router,
    private snakeaBar: SnakebarService ) { }


  ngOnInit() {    
    this.route.paramMap.subscribe(params => {
      this.productId = +params.get('productId')!;
      //console.log("params " ,this.productId);
    });

    this.proService.getProductById(this.productId).subscribe(item => {
      this.product = item;
      //console.log("details " + JSON.stringify(item, null, 2));
    },(error) => {      
        console.error('Error fetching product:', error);
      });
  }

  


  addToWishList(product: IProduct) {
   // this.wishlistService.addToWishlist(product);
    this.wishlistService.addToWishlist2(product);
    if (this.checkItemsInWishList[product.name]) {
      this.snakeaBar.showSnakeBar(`'${product.name}' already at  Wish list`);
    } else {
      this.snakeaBar.showSnakeBar(`'${product.name}' Added to  Wish list successfully`);
      this.checkItemsInWishList[product.name] = true;
    }
    console.log("product added to wish " + product.name);
  }

  addToCart(product: IProduct) {
    product.count = 1 ; 
    product.totalprice = product.count * product.price;
    //this.cartService.addCartItem(this.staticProduct.mapToCartViewModel(product));
    this.cartService.addCartItem2(product);
    //console.log("product added to Cart " + JSON.stringify(product, null, 2));
    this.snakeaBar.showSnakeBar(`'${product.name}' Added to Cart successfully`);

  }

  ngOnDestroy(): void {
    this.paramMapSubscription?.unsubscribe();
  }


  goBack(): void {
    this.router.navigate(['/product/ProductList']);
  }
  getFilledStars(rate: number): number {
    return Math.floor(rate);
  }

  getEmptyStars(rate: number): number {
    return 6 - Math.ceil(rate);
  }
}
