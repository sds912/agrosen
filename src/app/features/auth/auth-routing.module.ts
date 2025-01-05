import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AuthComponent } from './auth.component';
import { RegisterComponent } from './pages/register/register.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';

const authRoutes: Routes = [
  { path: '', component: AuthComponent,
    children:[
      {
        path: 'signin',
        component: LoginComponent
      },
      {
        path: 'signup',
        component: RegisterComponent
      },
      {
        path: 'reset-password',
        component: ResetPasswordComponent
      }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
