import { Component, OnInit } from '@angular/core';
import { AlarmesService } from '../../service/alarmes.service';
import { TicketService } from '../../service/ticket.service';
import { ALARM_STATE, TiCKET_STATE } from '../../shared/app-constants';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DonutService } from '../../service/donut.service';

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
  alarmTotal =  0;
  alarmWorking = 0
  alarmClosed = 0;
  ticketTotal =  0;
  ticketWorking = 0
  ticketClosed = 0;

  cleared:any;
  active:any;
  loading: boolean = false;
  alarmes: any[] = [];
  Currentpage: number = 1;
  size: number = 10;
  donne:any
  constructor(private alarmeService:AlarmesService, private ticketService: TicketService,private message: NzMessageService,private dnt:DonutService){}

  ngOnInit(): void {
    this.getOccurencDTU_NO_Response();
    this.getOccurenceMain_AC_OUT();
    this.getAllAlarmesCleared();
    this.getAllAlarmesActive();
    this.getAlarmTotal();
    this.getAlarmClosed();
    this.getAlarmWorking();
    this.getTicketClosed();
    this.getTicketWorking();
    this.getTicketTotal();
    this.getData();
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

    // New methods to fetch individual statistics
  getAlarmTotal() {
    this.alarmeService.countAlarmByStatus().subscribe(
      data => {
        this.alarmTotal = data.count;
      }
    );
  }

  getAlarmWorking() {
    this.alarmeService.countAlarmByStatus(ALARM_STATE.INPROGRESS).subscribe(
      data => {
        this.alarmWorking = data.count;
        
      }
    );
  }

  getAlarmClosed() {
    this.alarmeService.countAlarmByStatus(ALARM_STATE.CLOSED).subscribe(
      data => {
        this.alarmClosed = data.count;
      }
    );
  }

  getTicketTotal() {
    this.ticketService.countTickerByStatus().subscribe(
      data => {
        this.ticketTotal = data.count;
      }
    );
  }

  getTicketWorking() {
    this.ticketService.countTickerByStatus(TiCKET_STATE.INPROGRESS).subscribe(
      data => {
       // console.log(data)
        this.ticketWorking = data.count;
      }
    );
  }

  getTicketClosed() {
    this.ticketService.countTickerByStatus(TiCKET_STATE.CLOSED).subscribe(
      data => {
        this.ticketClosed = data.count;
      }
    );
  }
  public getAlarmes() {
    this.loading = true;
    this.alarmeService.getAlarmes(this.Currentpage, this.size).subscribe(
      (response: any) => {
        this.alarmes =  response.data;
        console.log(this.alarmes)
        this.loading = false;
        this.message.success('Alarms loaded successfuly !')
      },
    error => {
      this.message.error(error.error.message);
      this.loading = false;
    })
}
 public getData(){
   this.dnt.getData().subscribe(data=>{
     this.donne=data
    console.log("dataa",this.donne)
   })
   
 }
}

