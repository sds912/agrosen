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



  getSites(limit: number = 10, pageIndex: number = 1): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/sites?limit=${limit}&page=${pageIndex}`);
  }

  getSiteById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/sites/${id}`);
  }

  createSite(site: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/sites`, site);
  }

  updateSite(id: string, site: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/sites/${id}`, site);
  }

  deleteSite(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }


  getCulsters(limit: number = 10, page: number = 1) {
    return this.http.get<any>(`${this.apiUrl}/clusters?limit=${limit}&page=${page}`);
  }

  filter(filterParams: { siteId: string | null; cluster: string | null; siteName: string | null; }) {
    let url = `${this.apiUrl}/sites`;
  
    // Initialize an array to hold query parameters
    const queryParams: string[] = [];
  
    // Check each parameter and add it to the queryParams array if it has a value
    if (filterParams.siteId) {
      queryParams.push(`siteId=${encodeURIComponent(filterParams.siteId)}`);
    }
    if (filterParams.cluster) {
      queryParams.push(`cluster=${encodeURIComponent(filterParams.cluster)}`);
    }
    if (filterParams.siteName) {
      queryParams.push(`siteName=${encodeURIComponent(filterParams.siteName)}`);
    }
  
    // If there are any query parameters, append them to the URL
    if (queryParams.length) {
      url += `?${queryParams.join('&')}`;
    }
  
    return this.http.get<any>(url);
  }
  

}
