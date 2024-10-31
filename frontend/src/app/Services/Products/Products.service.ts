import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../../Models/IProduct';
import { catchError, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  httpOptions;

  private backendUrl =  `${environment.api}/Product/GetProductsWithTitle222`;  
  private detailsUrl =  `${environment.api}/Product`; 
  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({     // headers: must be lowercase  .
        'Content-Type': 'application/json'
      })
    }
  }

  getCategoryByTitle2(title: string): Observable<any> {
    const url = `${this.backendUrl}?title=${title}`;
    // console.log(url);
    return this.http.get<any>(url);
  }

  getProductById(prodID: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.detailsUrl}/${prodID}`); // Fetch single product by ID
  }


}
