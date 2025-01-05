import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceComponent } from './service.component';
import { ServiceHomeComponent } from './pages/service-home/service-home.component';
import { ServiceDetailsComponent } from './pages/service-details/service-details.component';
import { ServiceCardComponent } from './components/service-card/service-card.component';
import { SharedModule } from '../../shared/shared.module';
import { ServiceRoutingModule } from './service-routing.module';
import { ServiceListComponent } from './components/service-list/service-list.component';



@NgModule({
  declarations: [
    ServiceComponent,
    ServiceHomeComponent,
    ServiceDetailsComponent,
    ServiceCardComponent,
    ServiceListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ServiceRoutingModule
  ]
})
export class ServiceModule { }
