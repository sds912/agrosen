import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrowdfundingComponent } from './crowdfunding.component';
import { CrowdfundingHomeComponent } from './pages/crowdfunding-home/crowdfunding-home.component';
import { CrowdfundingDetailsComponent } from './pages/crowdfunding-details/crowdfunding-details.component';

const crowdFuningRoutes: Routes = [
  { path: '', component: CrowdfundingComponent,
    children:[
      {
        path: '',
        component: CrowdfundingHomeComponent
      },
      {
        path: ':id',
        component: CrowdfundingDetailsComponent
      }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(crowdFuningRoutes)],
  exports: [RouterModule]
})
export class CrowfundingRoutingModule { }
