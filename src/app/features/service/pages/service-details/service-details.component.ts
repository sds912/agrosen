import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.css']
})
export class ServiceDetailsComponent implements OnInit {
  private services = [
    {
      id: '1',
      image: 'https://picsum.photos/400/300?random=1',
      title: 'Irrigation',
      available: true,
      address: 'Ferme de Ndiagne, Louga, Sénégal',
      lat: 15.6107,
      lng: -16.2414,
      description: 'Système d’irrigation moderne pour une gestion optimale de l’eau dans vos cultures.',
      author: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '+221 77 123 4567',
      },
    },
    {
      id: '2',
      image: 'https://picsum.photos/400/300?random=2',
      title: 'Matériel Agricole',
      available: true,
      address: 'Zone Industrielle, Dakar, Sénégal',
      lat: 14.7167,
      lng: -17.4677,
      description: 'Matériel agricole de haute qualité pour faciliter vos travaux sur le terrain.',
      author: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '+221 77 123 4567',
      },
    },
    {
      id: '3',
      image: 'https://picsum.photos/400/300?random=3',
      title: 'Semences Certifiées',
      available: true,
      address: 'Marché Central, Kaolack, Sénégal',
      lat: 14.1837,
      lng: -16.2539,
      description: 'Semences certifiées pour des rendements agricoles optimaux.',
      author: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '+221 77 123 4567',
      },
    },
    // Repeat for all other services
  ];

  
  
  service: any;
  showFullDescription: boolean = false;
  relatedServices = this.services;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const serviceId = this.route.snapshot.paramMap.get('id');
    // Fetch the service details based on the ID (this is an example)
    this.service = this.services.find(s => s.id === serviceId);
  }

  toggleDescription() {
    this.showFullDescription = !this.showFullDescription;
  }

  onExchangeService() {
    // Logic to exchange the current service with another one
    const currentServiceIndex = this.relatedServices.indexOf(this.service);
    const nextService = this.relatedServices[(currentServiceIndex + 1) % this.relatedServices.length];
    this.service = nextService;
  }

  goBackToList() {
   this.router.navigate(['/service']);
  }

  contactAuthor(method: string): void {
    switch (method) {
      case 'phone':
        window.open(`tel:${this.service.author.phone}`, '_self');
        break;
      case 'email':
        window.open(`mailto:${this.service.author.email}`, '_self');
        break;
      case 'whatsapp':
        window.open(`https://wa.me/${this.service.author.phone.replace(/\D/g, '')}`, '_blank');
        break;
      case 'sms':
        window.open(`sms:${this.service.author.phone}`, '_self');
        break;
    }
  }
}
