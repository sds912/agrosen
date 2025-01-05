import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from '../../shared/shared.module';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { MainProductCardComponent } from './components/main-product-card/main-product-card.component';
import { MainProductListComponent } from './components/main-product-list/main-product-list.component';
import { MainPostListComponent } from './components/main-post-list/main-post-list.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { MainBottomNavBarComponent } from '../../shared/components/main-bottom-nav-bar/main-bottom-nav-bar.component';



@NgModule({
  declarations: [
    HomeComponent,
    MainComponent,
    MainProductCardComponent,
    MainProductListComponent,
    MainPostListComponent,
    ProductDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MainRoutingModule
  ]
})
export class MainModule { }
