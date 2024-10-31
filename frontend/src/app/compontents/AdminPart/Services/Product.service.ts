import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from '../../../Models/IProduct';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl =  `${environment.api}/Product/GetProductsWithRatings`;
  private apdateUrl = `${environment.api}/Product`
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

 
  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.apiUrl);
  }

 
  getProductById(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.apiUrl}/${id}`);
  }


  createProduct(product: IProduct): Observable<IProduct> {
    //console.log("post ", product);
    return this.http.post<IProduct>(this.apdateUrl, product, this.httpOptions);
  }


  updateProduct(product: IProduct): Observable<IProduct> {
    return this.http.put<IProduct>(`${this.apdateUrl}/${product.productId}`, product, this.httpOptions);
  }


  deleteProduct(id: number): Observable<void> {
    //console.log("deleteID " , id); 
    return this.http.delete<void>(`${this.apdateUrl}/${id}`);
  }
}
