import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.component.html',
  styleUrl: './service-card.component.scss'
})
export class ServiceCardComponent {
  @Input() service: {
    id: string,
    image: string;
    title: string;
    available: boolean;
    address: string;
  } = {
    id: '',
    image: '',
    title: '',
    available: false,
    address: '',
  };
}
