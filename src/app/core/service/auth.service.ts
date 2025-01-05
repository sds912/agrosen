import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.BaseUrl;
  private authTokenKey = 'access_token';
  private refreshTokenKey = 'refresh_token';
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { username: string, password: string }) {
    const data = {
      'identifier': credentials.username,
      'pass': credentials.password
   }
    return this.http.post<any>(`${this.baseUrl}/auth/signin`, data)
      .pipe(
        tap(response => {
          localStorage.setItem(this.authTokenKey, response.access_token);
          localStorage.setItem(this.refreshTokenKey, response.refresh_token);
          this.router.navigate(['/admin/dashboard'])

        }),
        catchError(this.handleError)
      );
  }

  logout() {
    localStorage.removeItem(this.authTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    this.router.navigate(['/login']);
  }

  getToken() {
    return localStorage.getItem(this.authTokenKey);
  }

  refreshToken() {
    const refreshToken = localStorage.getItem(this.refreshTokenKey);
    if (!refreshToken) {
      this.logout();
      return throwError('No refresh token available');
    }
    return this.http.post<any>(`${this.baseUrl}/api/auth/refresh-token`, { refreshToken })
      .pipe(
        tap(response => {
          localStorage.setItem(this.authTokenKey, response.accessToken);
          localStorage.setItem(this.refreshTokenKey, response.refreshToken);
        }),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 401) {
      this.logout();
    }
    return throwError(error);
  }
}
