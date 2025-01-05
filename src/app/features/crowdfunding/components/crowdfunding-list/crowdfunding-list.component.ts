import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crowdfunding-list',
  templateUrl: './crowdfunding-list.component.html',
  styleUrls: ['./crowdfunding-list.component.css'],
})
export class CrowdfundingListComponent implements OnInit {
  crowdfundingList: any[] = [
    {
      id: 1,
      title: 'Soutien à l\'agriculture durable au Sénégal',
      image: 'https://picsum.photos/150/150?random=1',
      targetFund: 20000,
      currentFund: 12000,
      publishedAt: new Date('2024-06-15'),
      author: 'AFD',
    },
    {
      id: 2,
      title: 'Création d\'un centre de formation agricole',
      image: 'https://picsum.photos/150/150?random=2',
      targetFund: 15000,
      currentFund: 8000,
      publishedAt: new Date('2024-07-10'),
      author: 'Maison Familiale Rurale des Hauts Pays',
    },
    {
      id: 3,
      title: 'Financement de fermes agricoles communautaires',
      image: 'https://picsum.photos/150/150?random=3',
      targetFund: 25000,
      currentFund: 15000,
      publishedAt: new Date('2024-08-05'),
      author: 'AFRIK NOW',
    },
    {
      id: 4,
      title: 'Plateforme de financement participatif agricole',
      image: 'https://picsum.photos/150/150?random=4',
      targetFund: 30000,
      currentFund: 18000,
      publishedAt: new Date('2024-09-20'),
      author: 'Neosen',
    },
    {
      id: 5,
      title: 'Soutien aux petits producteurs agricoles',
      image: 'https://picsum.photos/150/150?random=5',
      targetFund: 10000,
      currentFund: 5000,
      publishedAt: new Date('2024-10-15'),
      author: 'ACEP Sénégal',
    },
    {
      id: 6,
      title: 'Développement de l\'agriculture durable',
      image: 'https://picsum.photos/150/150?random=6',
      targetFund: 20000,
      currentFund: 12000,
      publishedAt: new Date('2024-11-10'),
      author: 'AFD',
    },
    {
      id: 7,
      title: 'Création d\'un centre de formation agricole',
      image: 'https://picsum.photos/150/150?random=7',
      targetFund: 15000,
      currentFund: 8000,
      publishedAt: new Date('2024-12-05'),
      author: 'Maison Familiale Rurale des Hauts Pays',
    },
    {
      id: 8,
      title: 'Financement de fermes agricoles communautaires',
      image: 'https://picsum.photos/150/150?random=8',
      targetFund: 25000,
      currentFund: 15000,
      publishedAt: new Date('2024-12-25'),
      author: 'AFRIK NOW',
    },
    {
      id: 9,
      title: 'Plateforme de financement participatif agricole',
      image: 'https://picsum.photos/150/150?random=9',
      targetFund: 30000,
      currentFund: 18000,
      publishedAt: new Date('2025-01-10'),
      author: 'Neosen',
    },
    {
      id: 10,
      title: 'Soutien aux petits producteurs agricoles',
      image: 'https://picsum.photos/150/150?random=10',
      targetFund: 10000,
      currentFund: 5000,
      publishedAt: new Date('2025-02-05'),
      author: 'ACEP Sénégal',
    },
    {
      id: 11,
      title: 'Développement de l\'agriculture durable',
      image: 'https://picsum.photos/150/150?random=11',
      targetFund: 20000,
      currentFund: 12000,
      publishedAt: new Date('2025-03-01'),
      author: 'AFD',
    },
    {
      id: 12,
      title: 'Création d\'un centre de formation agricole',
      image: 'https://picsum.photos/150/150?random=12',
      targetFund: 15000,
      currentFund: 8000,
      publishedAt: new Date('2025-03-20'),
      author: 'Maison Familiale Rurale des Hauts Pays',
    },
  ];
  
  ngOnInit(): void {
    // Load campaigns via API in a real application
  }
}
