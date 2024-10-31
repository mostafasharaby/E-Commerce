import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../Services/Cart/Cart.service';
import { ICategory, IProduct, MENU } from '../../../Models/IProduct';
import { StaticProductService } from '../../../Services/StaticProdduct/StaticProduct.service';
import { WishlistService } from '../../../Services/Wish/Wishlist.service';
import { UserAuthenticationService } from '../../../Services/userAuthentication/UserAuthentication.service';
import { Router } from '@angular/router';
import { ProductcardsComponent } from '../../User/Productcards/Productcards.component';
import { SearchService } from '../../../Services/Search/Search.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-Navbar',
  templateUrl: './Navbar.component.html',
  styleUrls: ['./Navbar.component.css']
})
export class NavbarComponent implements OnInit {

  nOfItems: number = 0;
  nOfItemsInWishList: number = 0;
  public searchItem !: string;
  selectedCategoryId: number = 0;
  catlist !: ICategory[];
  cart: IProduct[] = [];
  menulist: { title: string; path: string }[] = MENU;
  isMenu = false;
  isLoggedIn = true;
  filteredCards: any[] = [];

  constructor(private cartService: CartService,
    private service: StaticProductService,
    private wishlist: WishlistService,
    private router: Router,
    private authService: UserAuthenticationService,
    private searchService: SearchService
  ) {
    //this.catlist = service.catlist;

    this.cartService.cartItems$.subscribe(items => {
      this.nOfItems = items.length;
       console.log( "nOfItems in navebar " + this.nOfItems);
    });

    // this.wishlist.getWishlistObservable().subscribe(wishlist => {
    this.wishlist.getWishlistObservable2().subscribe(wishlist => {
      this.nOfItemsInWishList = wishlist.length;
    });

  }

  confirmLogout(): void {
    console.log('Logging out...');
    this.authService.logout();
    this.router.navigate(['/auth/Login']);
  }

  cancelLogout(): void {
    console.log('Logout cancelled.');
    this.router.navigate(['/Home']);
  }

  openMenu() {
    this.isMenu = true;
  }
  closeMenu() {
    this.isMenu = false;
  }

  // onCategoryChange(event: any) {
  //   this.selectedCategoryId = +event.target.value;  // Get the selected category ID
  //   console.log("Selected Category ID: " + this.selectedCategoryId);

  //   // Update the selected category in the shared service
  //   this.service.changeCategoryId(this.selectedCategoryId);
  // }


  search(event: any) {
    const query = this.searchItem.toLowerCase();
    this.searchService.setSearchTerm(query);  
    let checkExist = this.searchService.setSearchTerm(query) == null;
    if (checkExist) {
      console.log("no search term");
    }
  }


  ngOnInit() {
    this.authService.getloggedStatus().subscribe(status => {
      this.isLoggedIn = status;
    });

  }



  Rotate() {
    const icon = document.getElementById("rot");
    //console.log(icon);
    if (icon) {
      icon.style.transform = 'rotate(360deg)';
      icon.style.transition = 'transform 0.5s';
    }
  }






}
