import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-crowdfunding-details',
  templateUrl: './crowdfunding-details.component.html',
  styleUrl: './crowdfunding-details.component.css'
})
export class CrowdfundingDetailsComponent {
  crowdfunding: any = {};

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    // Fetch crowdfunding details by ID from an API
    this.crowdfunding ={
      id: 1,
      title: 'Soutien à l\'agriculture durable au Sénégal',
      image: 'https://picsum.photos/150/150?random=1',
      targetFund: 20000,
      currentFund: 12000,
      publishedAt: new Date('2024-06-15'),
      author: 'AFD',
    };
  }
}
