import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IOrderDetails, IOrderDetails22 } from '../../Models/IProduct';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl =  `${environment.api}/OrderDetails`;  
  constructor(private http: HttpClient) {}

  postOrderDetails(order: IOrderDetails): Observable<IOrderDetails> {
    const token = localStorage.getItem('token');
    //console.log("Token: " + JSON.stringify(token));
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,  
    });

    return this.http
      .post<IOrderDetails>(this.apiUrl, order, { headers })
      .pipe(catchError(this.handleError));
  }

  
  postOrderDetails2(order: IOrderDetails22): Observable<IOrderDetails22> {
    const token = localStorage.getItem('token');
    //console.log("Token: " + JSON.stringify(token));
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,  
    });

    return this.http
      .post<IOrderDetails22>(this.apiUrl, order, { headers })
      .pipe(catchError(this.handleError));
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
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
