import { Component } from '@angular/core';

@Component({
  selector: 'app-main-footer',
  templateUrl: './main-footer.component.html',
  styleUrl: './main-footer.component.css'
})
export class MainFooterComponent {
  currentYear: number = new Date().getFullYear();
}
