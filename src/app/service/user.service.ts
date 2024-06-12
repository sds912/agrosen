import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.BaseUrl; // Replace with your API URL

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/users/findbyrole`);

  }

  getUsersByRole(role: string): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/users/findbyrole?role=${role}`);

  }

  getUser(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/${id}`);
  }

  createUser(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/create`, user);
  }

  updateUser(id: string, user: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${id}`, user);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${id}`);
  }
}
