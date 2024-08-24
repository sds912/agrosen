import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../service/login.service';
import { ALARM_STATE, ROLE, TICKET_TYPE } from '../../shared/app-constants';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit{

  isCollapsed = false;
  currentUser: any = null;
  ticketType = TICKET_TYPE;
  alarmStatus = ALARM_STATE;
  ROLE: any = ROLE;
  currentTicketId?: string ;

  constructor(private loginService: LoginService, private route: ActivatedRoute){

  }


  ngOnInit(): void {
    if(localStorage.getItem('access_token') !== '' && localStorage.getItem('access_token') !== null ){
      this.loginService.loardProfile(localStorage.getItem('access_token'))
      this.currentUser = this.loginService.currentUser;
    }

  this.route.queryParams.subscribe((param) => {
    console.log(param['ticketId'] );
    
    this.currentTicketId = undefined;
    if( (param['type'] === TICKET_TYPE.PM && param['id'] !== undefined ) || param['ticketId'] !== undefined){
   this.currentTicketId = param['id'] !== undefined ? param['id'] :param['ticketId'];
    }
    
  })
    
    
  }

  logout(): void {
    this.loginService.logout();
  }


}
