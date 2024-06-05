import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-alarm-ticket-management',
  templateUrl: './alarm-ticket-management.component.html',
  styleUrl: './alarm-ticket-management.component.css'
})
export class AlarmTicketManagementComponent implements OnInit {

  constructor(private route: ActivatedRoute){}
  type:any= 'list';

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
     this.type = params.get('state')
    });
    
  }

}
