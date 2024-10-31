import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface OrderDetails {
  id: number;
  userName: string;
  total: number;
  createdAt: string;
  status :string;
}

@Injectable({
  providedIn: 'root'
})
export class OrderDetailsService {
 
  private apiUrl =  `${environment.api}/OrderDetails`;  
  constructor(private http: HttpClient) { }

  getOrderDetails(): Observable<OrderDetails[]> {
    return this.http.get<OrderDetails[]>(this.apiUrl);
  }
}
