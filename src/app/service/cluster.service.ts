import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClusterService {

  private apiUrl = environment.BaseUrl; // Your backend API URL


  constructor(private http: HttpClient) { }




  getClusters(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/clusters`);
  }

  getClusterById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/clusters/${id}`);
  }

  createCluster(cluster: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/clusters`, cluster);
  }

  updateCluster(id: string, cluster: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/clusters/${id}`, cluster);
  }

  deleteCluster(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/clusters${id}`);
  }

  
}
