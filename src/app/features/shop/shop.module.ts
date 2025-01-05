import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { CartDetailsComponent } from './pages/cart-details/cart-details.component';
import { ShopHomeComponent } from './pages/shop-home/shop-home.component';
import { ShopRoutingModule } from './shop-routing.module';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [
    ShopComponent,
    CartDetailsComponent,
    ShopHomeComponent,
    
  ],
  imports: [
    CommonModule,
    SharedModule,
    ShopRoutingModule
  ]
})
export class ShopModule { }
