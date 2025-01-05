import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopComponent } from './shop.component';
import { ShopHomeComponent } from './pages/shop-home/shop-home.component';
import { CartDetailsComponent } from './pages/cart-details/cart-details.component';


const shopRoutes: Routes = [
  { path: '', component: ShopComponent,
    children:[
      {
        path: '',
        component: ShopHomeComponent
      },
      {
        path: 'cart',
        component: CartDetailsComponent
      }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(shopRoutes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
