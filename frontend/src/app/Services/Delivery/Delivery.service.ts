import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Delivery, Delivery2 } from '../../Models/IProduct';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
  private apiUrl =  `${environment.api}/Deliveries`;  
  constructor(private http: HttpClient) { }

  private deliveryDataSource = new BehaviorSubject<Delivery2 | null>(null);
  deliveryData$ = this.deliveryDataSource.asObservable();

  // Method to update delivery data
  setDeliveryData(delivery: Delivery2|null){
    this.deliveryDataSource.next(delivery);
    console.log("setDeliveryData ", this.deliveryDataSource);
  }

  

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`  
    });
  }

  getDeliveries(): Observable<Delivery[]> {
    return this.http.get<Delivery[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getDelivery(id: string): Observable<Delivery> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Delivery>(url, { headers: this.getHeaders() });
  }

  createDelivery(delivery: Delivery): Observable<Delivery> {
    console.log(`createDelivery`, delivery);
    return this.http.post<Delivery>(this.apiUrl, delivery, { headers: this.getHeaders() });
  }

  updateDelivery(id: string, delivery: Delivery): Observable<Delivery> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Delivery>(url, delivery, { headers: this.getHeaders() });
  }

  deleteDelivery(id: string): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url, { headers: this.getHeaders() });
  }
}
