import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class AlarmesService {
 
  

  private apiBaseUrl = environment.BaseUrl;
  

  constructor(private http: HttpClient) { }

  public getDashboardData(status: string){
    return this.http.get(this.apiBaseUrl+`/api/tickets/count?status=${status}`)
   }
  public getData(motCle:String,page:number,size:number){
    return this.http.get(this.apiBaseUrl+"/cherchersite?mc="+motCle+"&size="+size+"&page="+page+"")
  }
   public getAlarmes(page:number,size:number){
    return this.http.get(this.apiBaseUrl+`/alarms?limit=${size}&page=${page}`)
   }
   public getSiteName(motCle:String,page:number,size:number){
    return this.http.get(this.apiBaseUrl+"/cherchersite?mc="+motCle+"&size="+size+"&page="+page+"")
   }
  public rechercheAlarmes(keyword:String){
    return this.http.get(this.apiBaseUrl+"/alarmes?nomAlarme="+keyword)
  }
   public getOcurrenceMain_AC_OUT(){
    return this.http.get(this.apiBaseUrl+"/alarmes/count/Main_AC_OUT")
   }
   public getOcurrenceDTU_NO_Response(){
    return this.http.get(this.apiBaseUrl+"/alarmes/count/DTU_NO_Response")
   }
   public getOcurrenceDC_Low_Voltage1(){
    return this.http.get(this.apiBaseUrl+"/alarmes/count/DC_Low_Voltage1")
   }
   public getOcurrenceDC_Low_Voltage2(){
    return this.http.get(this.apiBaseUrl+"/alarmes/count/DC_Low_Voltage2")
   }
   public getNombreTotalAlarmes(){
    return this.http.get(this.apiBaseUrl+"/alarmes/count")
   }
   public getNombreTotalAlarmesCleared(){
    return this.http.get(this.apiBaseUrl+"/alarmes/count/alarmCleared/1")
   }
   public getNombreTotalAlarmesActive(){
    return this.http.get(this.apiBaseUrl+"/alarmes/count/alarmCleared/0")
   }
   getMarkers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiBaseUrl}/listeAlarmes`);
  }

  countAlarmByStatus(status: any = null): Observable<any> {
   if(status !== null){
    return this.http.get<{ total: number }>(`${this.apiBaseUrl}/alarms/count?status=${status}`);

   }
   return this.http.get<{ total: number }>(`${this.apiBaseUrl}/alarms/count`);

  }

  createAlarm(alarm: any): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/alarms`, alarm);
  }

  updateAlarm(id: number, alarm: any): Observable<any> {
    return this.http.put(`${this.apiBaseUrl}/alarms/${id}`, alarm);
  }

  deleteAlarm(id: number): Observable<any> {
    return this.http.delete(`${this.apiBaseUrl}/alarmes/${id}`);
  }

  filter(filterParams: any = null, page: number = 1, limit: number = 10): Observable<any> {
    // Initialize the query string
    let queryParams = '';
  
    // Check each parameter and append to the query string if not null
    if (filterParams) {
      const params = [];
      
      if (filterParams.siteId !== null) {
        params.push(`siteId=${filterParams.siteId}`);
      }
      if (filterParams.alarmName !== null) {
        params.push(`name=${filterParams.alarmName}`);
      }
      if (filterParams.date !== null) {
        params.push(`dateStart=${filterParams.date}`);
      }

      if (filterParams.status !== null) {
        params.push(`status=${filterParams.status}`);
      }
      
      params.push(`limit=${limit}`);
      params.push(`page=${page}`);

      
      // Join all parameters with '&' and prepend with '?'

      if (params.length > 0) {
        queryParams = '?' + params.join('&');
      }
    }
  
    // Construct the complete URL
    const url = `${this.apiBaseUrl}/alarms/${queryParams}`;
    console.log(url);
    
    // Return the HTTP GET request
    return this.http.get<any>(url);
  }
  

  getAlarmsByStatus(status: string) {
   return this.http.get<any>(`${this.apiBaseUrl}/alarms?status=${status}`);
    
  }


  getReadData(limit: number = 10, pageIndex: number = 1) {
   return this.http.get<any>(`${this.apiBaseUrl}/last-data?limit=${limit}&page=${pageIndex}`);
    
  }
}
