import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {  HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlarmesComponent } from './component/alarmes/alarmes.component';
import { MenuComponent } from './component/menu/menu.component';
import { DonnesluesComponent } from './component/donneslues/donneslues.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterpipePipe } from './filterpipe.pipe';
import { AdminComponent } from './component/admin/admin.component';
import { appHttpInterceptor } from './interceptors/app-http.interceptor';
import { MapComponent } from './component/map/map.component';
import { GoogleMapsModule } from '@angular/google-maps'
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ChartjsComponent } from './component/chartjs/chartjs.component';
import { GoogleMap } from '@angular/google-maps';
import { AlarmePipe } from './alarme.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AlarmesComponent,
    MenuComponent,
    DonnesluesComponent,
    FilterpipePipe,
    AdminComponent,
    MapComponent,
    DashboardComponent,
    ChartjsComponent,
    AlarmePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    FormsModule,
    GoogleMapsModule,
    GoogleMap,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS ,useClass:appHttpInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
