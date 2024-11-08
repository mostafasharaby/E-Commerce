import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailsComponent } from '../compontents/User/ProductDetails/ProductDetails.component';
import { ProductcardsComponent } from '../compontents/User/Productcards/Productcards.component';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from '../compontents/User/Cart/Cart.component';
import { CheckoutComponent } from '../compontents/User/Checkout/Checkout.component';
import { WishlistComponent } from '../compontents/User/Wishlist/Wishlist.component';
import { FilterProductsComponent } from '../compontents/User/FilterProducts/FilterProducts.component';
import { CardsWithFilterComponent } from '../compontents/User/CardsWithFilter/CardsWithFilter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategorylistComponent } from '../compontents/User/Categorylist/Categorylist.component';
import { FinishPaymentComponent } from '../compontents/User/FinishPayment/FinishPayment.component';
import { PaymentComponent } from '../compontents/User/Payment/Payment.component';
import { DeliveryComponent } from '../compontents/User/Delivery/Delivery.component';

const routes: Routes = [    
  {path:'productCards', component: ProductcardsComponent},
  {path:'productDetails/:productId', component: ProductDetailsComponent},
  {path:'Cart', component: CartComponent},
  {path:'wishlist', component: WishlistComponent},
  {path:'filter', component: FilterProductsComponent},
  {path:'card', component: CardsWithFilterComponent},
  {path:'checkout', component: CheckoutComponent},
  {path:'payment', component: PaymentComponent},
  {path:'completepayment', component: FinishPaymentComponent},
  {path:'category/:title', component: CategorylistComponent},
  {path:'delivery', component: DeliveryComponent}
]
@NgModule({
  imports: [
    CommonModule ,
    FormsModule ,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  declarations: [
    ProductDetailsComponent,
    ProductcardsComponent,  
    CartComponent,
    CheckoutComponent,
    FinishPaymentComponent,
    WishlistComponent,
    FilterProductsComponent,
    CardsWithFilterComponent,
    CategorylistComponent,
    PaymentComponent,
    DeliveryComponent
  ]
})
export class ProductModuleModule { }
