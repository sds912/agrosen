import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { AlarmesComponent } from './component/alarmes/alarmes.component';
import { MenuComponent } from './component/menu/menu.component';
import { DonnesluesComponent } from './component/donneslues/donneslues.component';
import { AdminComponent } from './component/admin/admin.component';
import { MapComponent } from './component/map/map.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ChartjsComponent } from './component/chartjs/chartjs.component';
import { AlarmTicketManagementComponent } from './pages/alarm-ticket-management/alarm-ticket-management.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';

const routes: Routes = [
  { path: '', redirectTo:"login", pathMatch:"full" },
  { path: 'alarmes', component: AlarmesComponent},
  { path: 'login', component: LoginComponent},
  { path: 'admin', component:AdminComponent,children:[
  { path: 'alarmes', component: AlarmesComponent},
  { path: 'menu', component:MenuComponent},
  { path: 'lue', component:DonnesluesComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'map', component: MapComponent},
  { path: 'chart', component: ChartjsComponent},
  { path: 'alarms/tickets', component: AlarmTicketManagementComponent},
  { path: 'users', component: UserManagementComponent}
  ]},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
