import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseAPI = environment.BaseUrl;

@Injectable({
  providedIn: 'root'
})
export class SaftyChecklistService {

  
  constructor(private http: HttpClient) { }


  getSaftyCheckList(): Observable<any>{
    return this.http.get(`${baseAPI}/question`);
  }


  saveSaftyCheckListResponse(data: any, ticketId: string): Observable<any>{
    return this.http.post(`${baseAPI}/tickets/${ticketId}/question/response`, data);
  }

  getSaftyCheckListResponseByTicketId(ticketId: string): Observable<any>{
    return this.http.get(`${baseAPI}/tickets/${ticketId}/question/response`);
  }



}
