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

  uploadImage(uploadData: FormData, currentTicketId: string | undefined) {
   // return this.http.get(`${baseAPI}/files/response/upload/${currentTicketId}/${uploadData}`, { responseType: 'arraybuffer' });
    return this.http.post(`${baseAPI}/files/response/upload/${currentTicketId}`, uploadData);

    
  }

 


  loadDocs(ticketId: string): Observable<any>{
    return this.http.get(`${baseAPI}/tickets/${ticketId}/response/documents`);
  }


  loadImage(fileName: string): Observable<ArrayBuffer>{
    return this.http.get(`${baseAPI}/files/${fileName}`, { responseType: 'arraybuffer' });
  }




}
