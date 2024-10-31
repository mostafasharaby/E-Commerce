import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { IProduct, IWishItem, IWishItemDto } from '../../Models/IProduct';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { UserAuthenticationService } from '../userAuthentication/UserAuthentication.service';
import { HandelErrorsService } from '../HandllingError/HandelErrors.service';

@Injectable({
  providedIn: 'root'
})

export class WishlistService {
  private wishlist: IWishItem[] = [];

  private apiUrl = `${environment.api}/WishListProducts`
  private wishlistSubject = new BehaviorSubject<IWishItem[]>(this.wishlist);
  wishlist$ = this.wishlistSubject.asObservable();
  constructor(private http: HttpClient,
    private authService: UserAuthenticationService,
    private handleErrorsService :HandelErrorsService) { }

  addToWishlist2(item: IProduct): void {
    if (!this.wishlist.find(existingItem => existingItem.productId === item.id)) {
      console.log('Adding to wishlist: ', item);

      // Send only the productId to the backend
      const wishItemDto: IWishItemDto = { productId: item.productId };

      const headers = this.authService.getHeaders();
      this.http.post<IWishItem>(this.apiUrl, wishItemDto, { headers })
        .pipe(
          tap(() => {
            const fullWishItem: IWishItem = {
              productId: item.productId,
              product: item
            };

            this.wishlist.push(fullWishItem);
            this.wishlistSubject.next([...this.wishlist]);  // Emit a copy of the updated wishlist
            console.log('Wishlist updated: ', this.wishlist);
          }),
          catchError(this.handleErrorsService.handleError)
        )
        .subscribe();
    } else {
      console.log('Wishlist item already added: ' + item.name);
    }

  }


  removeFromWishlist2(itemId: number): void {
    const headers = this.authService.getHeaders();
    const previousWishlist = [...this.wishlist]; // Keep a copy of the previous wishlist state
    this.wishlist = this.wishlist.filter(item => item.productId !== itemId);
    this.wishlistSubject.next(this.wishlist); // Emit the updated wishlist

    console.log(`Wishlist updated in service: Removed Item ID ${itemId}`);

    this.http.delete(`${this.apiUrl}/${itemId}`, { headers })
      .pipe(
        tap(() => {
          console.log(`Removed from wishlist on the server: Item ID ${itemId}`);
        }),
        catchError((error) => {
          console.error('Error removing from wishlist on server:', error);

          // Restore the wishlist if there is a failure
          this.wishlist = previousWishlist;
          this.wishlistSubject.next(this.wishlist); // Emit the restored wishlist
          return this.handleErrorsService.handleError(error);
        })
      )
      .subscribe(() => {
        console.log('Server confirmed item removal');
      });
  }


  getWishlist2(): Observable<IWishItem[]> {
    const headers = this.authService.getHeaders();  // Get the headers with the token
    return this.http.get<IWishItem[]>(this.apiUrl, { headers }).pipe(
      tap((fetchedWishlist) => {
        this.wishlist = fetchedWishlist;
        this.wishlistSubject.next(this.wishlist); // Emit the fetched wishlist
        console.log('Wishlist fetched from API', this.wishlist);
      }),
      catchError(this.handleErrorsService.handleError)
    );
  }
 
  getWishlistObservable2(): Observable<IWishItem[]> {
    return this.wishlistSubject.asObservable();
  }



  clearWishlist2(): void {
    const headers = this.authService.getHeaders();  
    this.http.delete(this.apiUrl, { headers })
      .pipe(
        tap(() => {
          this.wishlist = [];
          this.wishlistSubject.next(this.wishlist); 
          console.log('Wishlist cleared');
        }),
        catchError(this.handleErrorsService.handleError)
      )
      .subscribe();
  }


}
