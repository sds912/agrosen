import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

const baseAPI = environment.BaseUrl;


@Injectable({
  providedIn: 'root'
})
export class TicketService {


  constructor(private http: HttpClient) { }


  fetchTicketById(id: string): Observable<any>{
    return this.http.get(`${baseAPI}/tickets/${id}`);
  }

  create(data: any): Observable<any>{
    return this.http.post(`${baseAPI}/tickets`, data);
  }

  assign(data: any): Observable<any>{
    return this.http.post(`${baseAPI}/tickets/assigned`, data);
  }

  acceptAssign( data: any): Observable<any>{
    return this.http.put(`${baseAPI}/tickets/accepted/${data.id}`, null);
  }

  fetchTickets(page: number, limit: number, type: string): Observable<any>{
    return this.http.get(`${baseAPI}/tickets/current-user?page=${page}&limit=${limit}&type=${type}`);
  }

  fetchRefNumber(): Observable<any> {

   return this.http.get<any>(`${baseAPI}/tickets/generate/site-access-request`, { responseType: "json" });
    
  }

  updateStatus(id: string, data: any): Observable<any>{
    return this.http.put(`${baseAPI}/tickets/update-status/${id}`, data);
  }

  getTicketTasks(id:string): Observable<any>{
    return this.http.get(`${baseAPI}/site-access-request-task/${id}`);
  }

  uploadImage(image: any, id: string){
    return this.http.post(`${baseAPI}/files/upload/${id}`, image);

  }

  loadImage(fileName: string): Observable<ArrayBuffer>{
    return this.http.get(`${baseAPI}/files/${fileName}`, { responseType: 'arraybuffer' });
  }


}
