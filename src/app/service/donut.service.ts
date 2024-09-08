import { Injectable } from '@angular/core';
import { donutModel } from '../model/donutModel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
@Injectable({
  providedIn: "root"
})
export class DonutService {
  private apiBaseUrl =  environment.BaseUrl; 

  constructor(private http: HttpClient) { }
    /* alarmeName:donutModel[]=[
        {nomAlarme:'DTU_NO_Response',nomBreOcurence:8},
        { nomAlarme:'Main_AC_OUT',nomBreOcurence:4},
        { nomAlarme:'DG_No_Started',nomBreOcurence:3},
        { nomAlarme:'DC_Low_Voltage1',nomBreOcurence:2},
        { nomAlarme:'DC_Low_Voltage2',nomBreOcurence:4}
      ];
      public getOcurrence(){
        this.alarmeName: this.http.get(this.apiBaseUrl+"/alarmes/occurrences")
        return this.alarmeName;
       }
      
  getAll(){
     return this.alarmeName;
    
  } */
  getData(): Observable<any[]> {
    return this.http.get<any[]>(this.apiBaseUrl + '/alarms/occurences');
  }
 // http://62.171.177.19:3001/api/alarms/occurences
}
