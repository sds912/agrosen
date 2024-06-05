import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router,RouterOutlet } from '@angular/router';
import { LoginService } from '../../service/login.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet,ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

     formLogin!:FormGroup
  constructor(private fb:FormBuilder,private authservice:LoginService,
    private router:Router){}

  ngOnInit(): void {
    this.formLogin=this.fb.group({
     username:this.fb.control(''),
     password:this.fb.control('')
    })
  }
  handleLogin(){
   let username=this.formLogin.value.username;
   let password= this.formLogin.value.password;
   this.authservice.login(username,password).subscribe({
     next:(data: any)=>{
      localStorage.setItem('access_token', data['access_token']);
      localStorage.setItem('refresh_token', data['access_token']);
       this.authservice.loardProfile(data['access_token'])
       this.router.navigateByUrl("/admin")
     },
     error:err=>{
       console.log(err)
     }

   })
  }
 

  

}
