import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isAuthenticate :boolean=false;
  roles:any
  username:any
  accessToken!:any
 constructor(private http:HttpClient) { }

 public login(username : String , password : String){
       // let params= new HttpParams().set("username",username).set("password",password)
       let paramsMap = new Map<any,any>();
         paramsMap.set('username',username);
         paramsMap.set('password',password);

     let params = new HttpParams();
     paramsMap.forEach((value: any, key: any) => {
     params = params.set(key, value);
  });
  let options={
   headers: new HttpHeaders().set("Content-type","application/x-www-form-urlencoded")
 }
        return this.http.post("http://localhost:8080/auth/login",params,options)
 }

 public loardProfile(data:any){
   this.isAuthenticate=true;
   this.accessToken = data['access-token']
   let decodedJwt:any =jwtDecode(this.accessToken);
   this.username=decodedJwt.sub;
   this.roles=decodedJwt.scope;
   
 }
 public logout(){
  this.isAuthenticate=false;
  this.accessToken=undefined;
  this.username=undefined;
  this.roles=undefined;
  window.localStorage.setItem("jwt-token",this.accessToken)
  
 }

 
}
