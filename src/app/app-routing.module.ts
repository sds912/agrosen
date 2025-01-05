import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo:'', pathMatch:'full' },
  {path: '', loadChildren: () => import('./features/main/main.module').then(m => m.MainModule)},
  {path: 'auth', loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)},
  {path: 'crowdfunding', loadChildren: () => import('./features/crowdfunding/crowdfunding.module').then(m => m.CrowdfundingModule)},
  {path: 'service', loadChildren: () => import('./features/service/service.module').then(m => m.ServiceModule)},
  {path: 'shop', loadChildren: () => import('./features/shop/shop.module').then(m => m.ShopModule)},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
