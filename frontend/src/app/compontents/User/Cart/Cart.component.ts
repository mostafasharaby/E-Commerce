import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Cart, IProduct } from '../../../Models/IProduct';
import { CartService } from '../../../Services/Cart/Cart.service';
import { Subscription } from 'rxjs';
import { Route, Router } from '@angular/router';
import { SendTotalToPaymentService } from '../../../Services/TotalToCheckout/SendTotalToPayment.service';

@Component({
  selector: 'app-Cart',
  templateUrl: './Cart.component.html',
  styleUrls: ['./Cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {

  //recivedCartofProductlist: cartViewModel[];
  recivedCartofProductlist: IProduct[];
  orderTotalPrice: number = 0;
  totalPrice: number = 0;
  selectedCategoryId: number = 0;
  cartSubscription !: Subscription;
  delivery: number = 0;
  totalDelivery: number = 0;
  constructor(private cartService: CartService,
    private router: Router,
    private totalService: SendTotalToPaymentService
  ) {
    this.recivedCartofProductlist = [];
    this.delivery = 15;
  }


  ngOnInit() {
   
    this.cartSubscription = this.cartService.getCartItems().subscribe({
      next: (items: Cart[]) => {
        console.log("Raw items received: ", items); 
        this.recivedCartofProductlist = items.map(item => {
          item.products.totalprice = item.products.price;
          item.products.count = 1;
          console.log("Current item: ", item); 
          return item.products;
        });
        console.log("recivedCartofProductlist  ", this.recivedCartofProductlist);
        this.updateTotalPrice();
      },
      error: (err) => {
        console.error('Error loading cart: ', err);
      }
    });

  }

  ngOnDestroy() {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
      console.log('cartSubscription has been unsubscribed');
    }
  }


  emptyTheCart() {
    this.cartService.emptyCartItems();
  }

  increaseCount(product: IProduct) {
    const foundProduct = this.recivedCartofProductlist.find(p => p.name === product.name);


    if (foundProduct) {
      foundProduct.count += 1;
      foundProduct.totalprice = foundProduct.count * foundProduct.price;
      this.updateTotalPrice();
    }
  }

  decreaseCount(product: IProduct) {
    let foundProduct = this.recivedCartofProductlist.find(p => p.name === product.name);
    let foundProductIndex = this.recivedCartofProductlist.findIndex(p => p.name === product.name);
    let cnt = 0;
    console.log("foundProduct ", foundProduct);
    if (foundProduct && foundProduct.count > 1) {
      foundProduct.count -= 1;

    } else if (foundProduct?.count == 1) {
      console.log("foundProduct.count == 1 ", foundProduct.description);
      this.recivedCartofProductlist.splice(foundProductIndex, 1);
      console.log("foundProduct.count after  ", foundProduct.id);
      cnt++;

      this.cartService.getCartItemByProductId(foundProduct.description!).subscribe(
        (cartItem) => {
          if (cartItem && cartItem.id!) {
            this.cartService.deleteCartItem(cartItem.id!).subscribe(
              (response: any) => {
                console.log('Cart item deleted successfully from the server', response);
              },
              (error: any) => {
                console.error('Error deleting cart item from the server', error);
              }
            );
          } else {
            console.error('Cart item not found for deletion');
          }
        },
        (error: any) => {
          console.error('Error fetching cart item by productId', error);
        }
      );


    }
    foundProduct!.totalprice = foundProduct!.count * foundProduct!.price;
    this.updateTotalPrice();
    this.totalDelivery -= this.delivery * cnt;

    this.cartService.cartItemsSubject.next([...this.recivedCartofProductlist]);
    console.log("size of cartof product " + this.recivedCartofProductlist);
  }

  updateTotalPrice() {
    this.orderTotalPrice = this.recivedCartofProductlist.reduce((total, item) => total + item.price * item.count, 0);
    this.totalDelivery = this.delivery * this.recivedCartofProductlist.length;
    this.orderTotalPrice += this.totalDelivery;
    this.totalService.sendTotalPrice(this.orderTotalPrice);
    console.log('Updated order total price:', this.orderTotalPrice);
  }


  routeToDetails(productId: number) {
    this.router.navigate(['/product/productDetails', productId]);
    console.log("routeToDetails", productId);
  }

}
