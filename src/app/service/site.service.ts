import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SiteService {

  private apiUrl = environment.BaseUrl; // Your backend API URL


  constructor(private http: HttpClient) { }


  fetchTicketById(id: string): Observable<any>{
    return this.http.get(`${environment.BaseUrl}/sites/${id}`);
  }



  getSites(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/sites`);
  }

  getSiteById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/sites/${id}`);
  }

  createSite(site: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/sites`, site);
  }

  updateSite(id: string, site: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, site);
  }

  deleteSite(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  

}
