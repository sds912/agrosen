import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiceComponent } from './service.component';
import { ServiceHomeComponent } from './pages/service-home/service-home.component';
import { ServiceDetailsComponent } from './pages/service-details/service-details.component';

const serviceRoutes: Routes = [
  { path: '', component: ServiceComponent,
    children:[
      {
        path: '',
        component: ServiceHomeComponent
      },
      {
        path: ':id',
        component: ServiceDetailsComponent
      }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(serviceRoutes)],
  exports: [RouterModule]
})
export class ServiceRoutingModule { }
