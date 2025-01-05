import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MainComponent } from './main.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';

const mainRoutes: Routes = [
  { path: '', component: MainComponent,
    children:[
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'product/:id',
        component: ProductDetailComponent
      }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(mainRoutes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
