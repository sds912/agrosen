import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router,RouterOutlet } from '@angular/router';
import { LoginService } from '../../service/login.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet,ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

     formLogin!:FormGroup
  constructor(private fb:FormBuilder,private authservice: AuthService,
    private router:Router, private message: NzMessageService){}

  ngOnInit(): void {
    this.formLogin=this.fb.group({
     username:this.fb.control(''),
     password:this.fb.control('')
    })
  }
  handleLogin(){
   let username=this.formLogin.value.username;
   let password= this.formLogin.value.password;
   
   this.authservice.login({username,password}).subscribe(() => {
   this.message.success('Authentification réussie !');
   }, 
  error => {
    this.message.error("Erreur d'authentification !");

  })
  }
 

  

}
