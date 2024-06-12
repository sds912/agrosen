import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserGroupService {

  private apiUrl = environment.BaseUrl; // Your backend API URL


  constructor(private http: HttpClient) { }


  getUserGroups(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user-groups`);
  }

  getSiteById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createSite(site: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, site);
  }

  updateSite(id: string, site: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, site);
  }

  deleteSite(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
