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

 /*  public getalarmes():Observable<Array<Alarmes >>{
    return this.http.get<Array<Alarmes>>(this.apiBaseUrl+"/chercherAlarme?mc=A&size=5&page=0")
    http://localhost:8080/cherchersite?mc=D&size=5&page=0
  } */

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
}
