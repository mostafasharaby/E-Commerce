import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IPaymentDetails } from '../../models/IProduct';
import { environment } from '../../../../../environments/environment';
import { HandelErrorsService } from '../HandllingError/HandelErrors.service';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private apiUrl =    `${environment.api}/PaymentDetails`;    
  constructor(private http: HttpClient , private handelErrorsService :HandelErrorsService) {}

  postPaymentDetails(payment: IPaymentDetails): Observable<IPaymentDetails> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http
      .post<IPaymentDetails>(this.apiUrl, payment, { headers })
      .pipe(catchError(this.handelErrorsService.handleError));
  }
  
}
