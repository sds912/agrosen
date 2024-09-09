import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../environments/environment.development';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

const apiBaseUrl = environment.BaseUrl;


@Injectable({
  providedIn: 'root'
})
export class LoginService {
 
  isAuthenticate :boolean=false;
  roles:any
  username:any
  accessToken!:any
  refreshToken!: any;
  currentUser: any;
 constructor(private http:HttpClient, private router: Router) { 
  const accessToken = localStorage.getItem('access_token')??"";
  const refreshToken = localStorage.getItem('refesh_token')??"";
  this.setTokens(accessToken, refreshToken);
  if(this.getAccessToken() !== ""){
    this.loardProfile(this.getAccessToken())
  }
 }

 public login(username : String , password : String){
       // let params= new HttpParams().set("username",username).set("password",password)
       let paramsMap = new Map<any,any>();
         paramsMap.set('identifier',username);
         paramsMap.set('pass',password);

     let params = new HttpParams();
     paramsMap.forEach((value: any, key: any) => {
     params = params.set(key, value);
  });
  let options={
   headers: new HttpHeaders().set("Content-type","application/x-www-form-urlencoded")
 }

        const data = {
           'identifier': username,
           'pass': password
        }

        
        return this.http.post(`${apiBaseUrl}/auth/signin`,data);
 }

 public loardProfile(token:any){
   this.isAuthenticate=true;
   let decodedJwt:any = jwtDecode(token);
   this.username=decodedJwt.username;
   this.roles=decodedJwt.role;
   this.currentUser = decodedJwt;
   this.loadUserInfo()

   
   
 }
 public logout(){
  this.isAuthenticate=false;
  this.accessToken=undefined;
  this.username=undefined;
  this.roles=undefined;
  localStorage.clear();
  this.router.navigate(['/login']);
  
 }

 setTokens(accessToken: string, refreshToken: string): void {
  this.accessToken = accessToken;
  this.refreshToken = refreshToken;
}

getAccessToken(): string {
  return this.accessToken;
}

getRefreshToken(): string {
  return this.accessToken;
}

refreshAccessToken(): Observable<any> {
  return this.http.post(`${apiBaseUrl}/auth/refresh-token`, { token: this.refreshToken })
    .pipe(tap((response: any) => {
      this.accessToken = response.accessToken;
    }));
}


resetPassword(password: string) {
  return this.http.post(`${apiBaseUrl}/users/credentials/resetpassword`, {
    password: password,
    token: this.accessToken
  })
}


loadUserInfo() {
  return this.http.get(`${apiBaseUrl}/users/profile`)
  .subscribe((response: any) => {
    if(!response?.firstCredentialUpdated){
       this.router.navigate(['/reset-password'])
    }
    
  });
}
 
}
