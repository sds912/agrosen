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

  getUserGroups(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user-groups`);
  }



  filterByParams(filterParams: { username: string | null; role: string | null; fn: string | null; ln: string | null; }) {
    // Base URL for the API
    let url = `${this.apiUrl}/users/findbyrole?`;

    // Create an array to store the query parameters
    const queryParams: string[] = [];

    // Check each filter parameter and add it to the queryParams array if it's not null
    if (filterParams.fn !== null) {
        queryParams.push(`firstName=${encodeURIComponent(filterParams.fn)}`);
    }
    if (filterParams.ln !== null) {
        queryParams.push(`lastName=${encodeURIComponent(filterParams.ln)}`);
    }
    if (filterParams.username !== null) {
        queryParams.push(`username=${encodeURIComponent(filterParams.username)}`);
    }
    if (filterParams.role !== null) {
        queryParams.push(`role=${encodeURIComponent(filterParams.role)}`);
    }

    // Join the queryParams array into a single string, separated by '&'
    if (queryParams.length > 0) {
        url += queryParams.join('&');
    }

    console.log(url);
    
    // Make the HTTP GET request with the constructed URL
    return this.http.get<any[]>(url);
}

}
