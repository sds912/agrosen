import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrowdfundingComponent } from './crowdfunding.component';
import { CrowdfundingHomeComponent } from './pages/crowdfunding-home/crowdfunding-home.component';
import { CrowdfundingDetailsComponent } from './pages/crowdfunding-details/crowdfunding-details.component';
import { CrowfundingRoutingModule } from './crowdfunding-routing.module';
import { CrowdfundingCardComponent } from './components/crowdfunding-card/crowdfunding-card.component';
import { CrowdfundingListComponent } from './components/crowdfunding-list/crowdfunding-list.component';
import { SharedModule } from '../../shared/shared.module';
import { CrowdfundingFormComponent } from './components/crowdfunding-form/crowdfunding-form.component';



@NgModule({
  declarations: [
    CrowdfundingComponent,
    CrowdfundingHomeComponent,
    CrowdfundingDetailsComponent,
    CrowdfundingCardComponent,
    CrowdfundingListComponent,
    CrowdfundingFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CrowfundingRoutingModule
  ]
})
export class CrowdfundingModule { }
