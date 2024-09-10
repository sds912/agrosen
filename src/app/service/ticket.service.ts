import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { IMAGE_TYPES } from '../shared/app-constants';

const baseAPI = environment.BaseUrl;


@Injectable({
  providedIn: 'root'
})
export class TicketService {
  uploadSiteMaintenance(selectedFile: any) {
    return this.http.post(`${baseAPI}/sites/update-schedule-date-maintenance`, selectedFile);
  }
 


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
    const url = `${baseAPI}/tickets/current-user?page=${page}&limit=${limit}&type=${type}`;
    console.log(url);
    
    return this.http.get(url);
  }

  fetchRefNumber(): Observable<any> {

   return this.http.get<any>(`${baseAPI}/generate/site-access-request-id`, { responseType: "json" });
    
  }

  updateStatus(id: string, data: any): Observable<any>{
    return this.http.put(`${baseAPI}/tickets/update-status/${id}`, data);
  }

  getTicketTasks(id:string): Observable<any>{
    return this.http.get(`${baseAPI}/site-access-request-task/${id}`);
  }

 // Service Method: Adjusted to only include true parameters
uploadImage(
  image: any, 
  id: string, 
  type: string
) {

 
  const url = `${baseAPI}/files/upload/${id}`;
  
  // Initialize query parameters
  let params = new HttpParams();

  // Conditionally add parameters
  if (type === IMAGE_TYPES.BEFORE_MAINTAIN) {
    params = params.set('afterMaintenance', 'false');
  }
  if (type === IMAGE_TYPES.AFTERM_MAINTAIN) {
    params = params.set('afterMaintenance', 'true');
  }
  if (type === IMAGE_TYPES.SENELECMETER) {
    params = params.set('senelecMeter', 'true');
  }
  if (type === IMAGE_TYPES.FLUENT_BETTERY) {
    params = params.set('fluentBattery', 'true');
  }
  if (type === IMAGE_TYPES.BETTERY_VOLTAGE) {
    params = params.set('batteryVoltage', 'true');
  }

  // Construct the complete URL with query parameters
  const fullUrl = `${url}?${params.toString()}`;
  console.log(fullUrl);

  // Perform the HTTP POST request
  return this.http.post(fullUrl, image);
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


reassignedTicket(data: any){
  return this.http.post(`${baseAPI}/tickets/reassigned`, data);

}

update(id: any, data: any) {
  return this.http.put(`${baseAPI}/tickets/${id}`, data);
  
}
  
}
