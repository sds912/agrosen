import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-main-product-card',
  templateUrl: './main-product-card.component.html',
  styleUrl: './main-product-card.component.scss'
})
export class MainProductCardComponent {

  @Input() product: any ;

}
