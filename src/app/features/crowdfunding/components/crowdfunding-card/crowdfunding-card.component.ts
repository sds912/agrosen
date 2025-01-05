import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-crowdfunding-card',
  templateUrl: './crowdfunding-card.component.html',
  styleUrls: ['./crowdfunding-card.component.scss'],
})
export class CrowdfundingCardComponent {
  @Input() crowdfunding: any = null;

  getDescription(): string {
    const percentage =
      (this.crowdfunding.currentFund / this.crowdfunding.targetFund) * 100;
    return `collecté ${this.crowdfunding.currentFund} sur ${this.crowdfunding.targetFund} (${percentage.toFixed(
      1
    )}%)`;
  }

  getProgressPercentage(): number {
    const percentage =
      (this.crowdfunding.currentFund / this.crowdfunding.targetFund) * 100;
    return Math.round(Math.min(percentage, 100)); // Cap at 100%
  }

  donateToCampaign(): void {
    console.log('Donate button clicked');
    // Logic for donating to the campaign
  }

  shareCampaign(): void {
    console.log('Share button clicked');
    // Logic for sharing the campaign
  }

  viewDetails(): void {
    console.log('More details button clicked');
    // Logic for navigating to campaign details
  }
}
