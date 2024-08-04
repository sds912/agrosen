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

  getNumber(type: string): Observable<any> {
    return this.http.get<any>(`${baseAPI}/tickets/generate/reference?type=${type}`, { responseType: "json" })
  }

 

  countTickerByStatus(status: any = null): Observable<any> {
    if(status !== null){
      return this.http.get<{ working: number }>(`${baseAPI}/tickets/count?status=${status}`);

    }

    return this.http.get<{ working: number }>(`${baseAPI}/tickets/count`);

  }

  filterTickets(page: number, limit: number, type: string, params: any): Observable<any> {
    // Start with the base URL and mandatory query parameters
    let url = `${baseAPI}/tickets/current-user?page=${page}&limit=${limit}&type=${type}`;

    // Conditionally add optional parameters
    if (params.site !== null && params.site !== '') {
        url += `&siteId=${params.site}`;
    }
    if (params.status !== null && params.status !== '') {
        url += `&status=${params.status}`;
    }
    if (params.date !== null) {
        url += `&createdDate=${params.date}`;
    }

    // Make the HTTP GET request
    console.log(url);
    
    return this.http.get(url);
}

  
}
