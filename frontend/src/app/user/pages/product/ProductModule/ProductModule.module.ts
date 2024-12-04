import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartComponent } from '../Cart/Cart.component';
import { ProductcardsComponent } from '../Productcards/Productcards.component';
import { ProductDetailsComponent } from '../ProductDetails/ProductDetails.component';
import { WishlistComponent } from '../Wishlist/Wishlist.component';
import { FilterProductsComponent } from '../FilterProducts/FilterProducts.component';
import { CardsWithFilterComponent } from '../CardsWithFilter/CardsWithFilter.component';
import { CheckoutComponent } from '../Checkout/Checkout.component';
import { PaymentComponent } from '../Payment/Payment.component';
import { CategorylistComponent } from '../Categorylist/Categorylist.component';
import { DeliveryComponent } from '../Delivery/Delivery.component';
import { FinishPaymentComponent } from '../FinishPayment/FinishPayment.component';


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
