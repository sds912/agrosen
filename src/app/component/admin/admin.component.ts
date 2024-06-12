import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit{

  isCollapsed = false;
  currentUser: any = null;

  constructor(private loginService: LoginService){

  }


  ngOnInit(): void {
    this.currentUser = this.loginService.currentUser;
    console.log(this.currentUser)
  }

  logout(): void {
    this.loginService.logout();
  }


}
