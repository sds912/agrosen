import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { AlarmesComponent } from './component/alarmes/alarmes.component';
import { MenuComponent } from './component/menu/menu.component';
import { AdminComponent } from './component/admin/admin.component';
import { MapComponent } from './component/map/map.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ChartjsComponent } from './component/chartjs/chartjs.component';
import { AlarmTicketManagementComponent } from './pages/alarm-ticket-management/alarm-ticket-management.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { SiteManagementComponent } from './pages/site-management/site-management.component';
import { TicketTaskManagementComponent } from './pages/ticket-task-management/ticket-task-management.component';
import { AuthGuard } from './shared/auth.guard';
import { SiteDetailsComponent } from './component/site-details/site-details.component';
import { DataReadComponent } from './pages/data-read/data-read.component';
import { PreJobSafetyChecklistComponent } from './pages/pre-job-safety-checklist/pre-job-safety-checklist.component';

const routes: Routes = [
  { path: '', redirectTo:"login", pathMatch:"full" },
  { path: 'login', component: LoginComponent},
  { path: 'admin', component:AdminComponent,
    children:[
  { path: 'alarmes', component: AlarmesComponent},
  { path: 'menu', component:MenuComponent},
  { path: 'lue', component:DataReadComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'map', component: MapComponent},
  { path: 'chart', component: ChartjsComponent},
  { path: 'alarms/tickets', component: AlarmTicketManagementComponent},
  { path: 'users', component: UserManagementComponent},
  { path: 'sites', component: SiteManagementComponent},
  { path: 'sites/:id', component: SiteDetailsComponent},
  { path: 'ticket/task', component: TicketTaskManagementComponent},
  { path: 'pre-job-safty-checklist', component: PreJobSafetyChecklistComponent},
  ], canActivate:[ AuthGuard]},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
