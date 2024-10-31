import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Delivery, Delivery2 } from '../../Models/IProduct';
import { environment } from '../../../environments/environment';
import { UserAuthenticationService } from '../userAuthentication/UserAuthentication.service';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
  private apiUrl =  `${environment.api}/Deliveries`;  
  constructor(private http: HttpClient , private authService : UserAuthenticationService) { }

  private deliveryDataSource = new BehaviorSubject<Delivery2 | null>(null);
  deliveryData$ = this.deliveryDataSource.asObservable();

 
  setDeliveryData(delivery: Delivery2|null){
    this.deliveryDataSource.next(delivery);
    console.log("setDeliveryData ", this.deliveryDataSource);
  }

  

  getDeliveries(): Observable<Delivery[]> {
    return this.http.get<Delivery[]>(this.apiUrl, { headers: this.authService.getHeaders() });
  }

  getDelivery(id: string): Observable<Delivery> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Delivery>(url, { headers: this.authService.getHeaders() });
  }

  createDelivery(delivery: Delivery): Observable<Delivery> {
    console.log(`createDelivery`, delivery);
    return this.http.post<Delivery>(this.apiUrl, delivery, { headers: this.authService.getHeaders() });
  }

  updateDelivery(id: string, delivery: Delivery): Observable<Delivery> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Delivery>(url, delivery, { headers: this.authService.getHeaders() });
  }

  deleteDelivery(id: string): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url, { headers: this.authService.getHeaders() });
  }
}
