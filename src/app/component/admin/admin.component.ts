import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../service/login.service';
import { TICKET_TYPE } from '../../shared/app-constants';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit{

  isCollapsed = false;
  currentUser: any = null;
  
  ticketType = TICKET_TYPE;

  constructor(private loginService: LoginService){

  }


  ngOnInit(): void {
    if(localStorage.getItem('access_token') !== '' && localStorage.getItem('access_token') !== null ){
      this.loginService.loardProfile(localStorage.getItem('access_token'))
      this.currentUser = this.loginService.currentUser;
    }
    
    
  }

  logout(): void {
    this.loginService.logout();
  }


}
