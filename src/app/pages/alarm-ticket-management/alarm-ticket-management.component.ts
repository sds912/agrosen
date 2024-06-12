import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TicketService } from '../../service/ticket.service';

@Component({
  selector: 'app-alarm-ticket-management',
  templateUrl: './alarm-ticket-management.component.html',
  styleUrl: './alarm-ticket-management.component.css'
})
export class AlarmTicketManagementComponent implements OnInit {

  constructor(private route: ActivatedRoute, private ticketService: TicketService){}
  state:any;
  displayMode: string  = 'list';
  ticket: any;
  type!: string;
  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {

     this.state = params.get('state');
     this.type = params.get('type')!;

     if(this.state === 'open'){
        this.displayMode = 'form';
     } else{
      const id = params.get('id');
      if(id !== undefined && id !== null && id !== ''){
       this.displayMode = 'form';
      } else{
         this.displayMode = 'list';
      }
     } 

    
    });
    
  }

}
