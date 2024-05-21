import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../service/login.service';

@Injectable()
export class appHttpInterceptor implements HttpInterceptor {
    constructor(private authService:LoginService) { }
    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
         console.log("***********")
         console.log(request.url)
        if(!request.url.includes("/auth/login")){
          let req =request.clone({
            headers :request.headers.set('Authorization','Bearer '+this.authService.accessToken)
           })
           return next.handle(req);
        }else
        {
          return next.handle(request);
        }
        
    }
}