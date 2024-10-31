import { Injectable, EventEmitter } from '@angular/core';
import { Cart, CartDTO, cartViewModel, IProduct } from '../../Models/IProduct';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs';
import { SnakebarService } from '../SnakeBar/Snakebar.service';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient, private snakebar: SnakebarService) { }

  private cartApi = `${environment.api}/CartItems`;
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`  // Attach the token
    });
  }

  public cartItemsSubject = new BehaviorSubject<IProduct[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();
  public search = new BehaviorSubject<string>("");


  getCartItems(): Observable<Cart[]> {
    const headers = this.getHeaders();  // Get the headers with the token
    return this.http.get<Cart[]>(this.cartApi, { headers }).pipe(
      tap((fetchedCartItems: any) => {
        this.cartItemsSubject.next(fetchedCartItems);  // Emit the fetched cart items
        console.log('Cart items fetched from API:', fetchedCartItems);
      }),
      catchError(this.handleError)  // Handle errors
    );
  }


  // Add cart item locally and post to the backend
  addCartItem2(item: IProduct) {
    const currentItems = this.cartItemsSubject.value;
    const existingIndex = currentItems.findIndex((i) => i.name === item.name);

    if (existingIndex !== -1) {
      currentItems[existingIndex].count += item.count;
      this.snakebar.showSnakeBar(`${currentItems[existingIndex].name} is already at Cart`);


    } else {
      currentItems.push(item);
      console.log("Addeddddddd to cart ", item)
    }

    this.cartItemsSubject.next(currentItems);
    console.log("Addeddddddd to cart ", item)
    const CartDTO: CartDTO = { productId: item.productId, count: item.count };
    console.log("CartDTO ", CartDTO.productId, item.count);

    this.saveCartToBackend(CartDTO).subscribe(
      (response: any) => {
        console.log('Cart item added successfully to the server', response);
      },
      (error: any) => {
        console.error('Error adding cart item to the server', error);
      }
    );
  }

  private mapCartModel(item: IProduct): Cart {
    return {
      productId: item.id,
      quantity: item.count,
      products: item
    };
  }

  saveCartToBackend(cart: CartDTO): Observable<CartDTO> {
    const headers = this.getHeaders();  // Get the headers with the token
    return this.http.post<CartDTO>(this.cartApi, cart, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  emptyCartItems() {
    const removeAll = this.cartItemsSubject.value;
    removeAll.length = 0;
    this.cartItemsSubject.next(removeAll);
  }


  deleteCartItem(cartId: number): Observable<any> {
    const headers = this.getHeaders();  // Get the headers with the token
    const deleteUrl = `${this.cartApi}/${cartId}`;
    return this.http.delete(deleteUrl, { headers }).pipe(
      catchError(this.handleError)
    );
  }


  getCartItemByProductId(productId: string): Observable<Cart | null> {
    const headers = this.getHeaders();  // Get the headers with the token
    return this.http.get<Cart | null>(`${this.cartApi}/GetByProduct/${productId}`, { headers }).pipe(
      tap((response) => {
        console.log('Existing cart item:', response);
      }),
      catchError(this.handleError)
    );
  }
  updateCartItem(cartItem: Cart): Observable<Cart> {
    return this.http.put<Cart>(`${this.cartApi}/${cartItem.id}`, cartItem);
  }

  private handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }


}
