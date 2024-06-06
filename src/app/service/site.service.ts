import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SiteService {

  constructor(private http: HttpClient) { }


  fetchTicketById(id: string): Observable<any>{
    return this.http.get(`${environment.BaseUrl}/sites/${id}`);
  }
}
