import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient) { }


  fetchTicketById(id: string): Observable<any>{
    return this.http.get(`${environment.BaseUrl}/tickets/${id}`);
  }
}
