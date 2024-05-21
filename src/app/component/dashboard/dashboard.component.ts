import { Component, OnInit } from '@angular/core';
import { AlarmesService } from '../../service/alarmes.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  occurenceMain_AC_OUT:any;
  occurenceDTU_NO_Response:any;
  occurenceDC_Low_Voltage1:any;
  occurenceDC_Low_Voltage2:any;
  nombreTotalAlarmes:any;
  cleared:any;
  active:any;
  constructor(private alarmeService:AlarmesService){}

  ngOnInit(): void {
    this.getAllAlarmes();
    this.getOccurencDTU_NO_Response();
    this.getOccurenceMain_AC_OUT();
    this.  getAllAlarmesCleared();
    this.getAllAlarmesActive();
  }
  getOccurenceMain_AC_OUT(){
    return this.alarmeService.getOcurrenceMain_AC_OUT().subscribe(
      data=>{
          this.occurenceMain_AC_OUT=data;
          //console.log(data);
      }
    )
   }
   getOccurencDTU_NO_Response(){
    return this.alarmeService.getOcurrenceDTU_NO_Response().subscribe(
      data=>{
          this.occurenceDTU_NO_Response=data;
         
      }
    )
   }
  
   getOccurencDC_Low_Voltage1(){
    return this.alarmeService.getOcurrenceDC_Low_Voltage1().subscribe(
      data=>{
          this.occurenceDC_Low_Voltage1=data;
        
      }
    )
   }
   getOccurencDC_Low_Voltage2(){
    return this.alarmeService.getOcurrenceDC_Low_Voltage2().subscribe(
      data=>{
          this.occurenceDC_Low_Voltage2=data;
          
      }
    )
   }
   getAllAlarmes(){
    return this.alarmeService.getNombreTotalAlarmes().subscribe(
      data=>{
          this.nombreTotalAlarmes=data;  
         // console.log(this.nombreTotalAlarmes)
      }
    )
   }
   getAllAlarmesCleared(){
    return this.alarmeService.getNombreTotalAlarmesCleared().subscribe(
      data=>{
          this.cleared=data;  
         // console.log(this.nombreTotalAlarmes)
      }
    )
   }
   getAllAlarmesActive(){
    return this.alarmeService.getNombreTotalAlarmesActive().subscribe(
      data=>{
          this.active=data;  
         // console.log(this.nombreTotalAlarmes)
      }
    )
   }
}
