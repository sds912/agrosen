import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

const baseAPI = environment.BaseUrl;


@Injectable({
  providedIn: 'root'
})
export class TicketService {


  constructor(private http: HttpClient) { }


  fetchTicketById(id: string): Observable<any>{
    return this.http.get(`${baseAPI}/tickets/${id}`);
  }

  acceptAssign(data: any): Observable<any>{
    return this.http.post(`${baseAPI}/tickets/assigned`, data);
  }

  fetchTickets(page: number, limit: number): Observable<any>{
    return this.http.get(`${baseAPI}/tickets/current-user?page=${page}&limit=${limit}`);
  }

}
