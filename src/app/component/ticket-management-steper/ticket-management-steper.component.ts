import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ticket-management-steper',
  templateUrl: './ticket-management-steper.component.html',
  styleUrl: './ticket-management-steper.component.css',
  animations: [
    trigger('slideMotion', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        style({ transform: 'translateX(-100%)' }),
        animate(300)
      ]),
      transition('* => void', [
        animate(300, style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class TicketManagementSteperComponent {
  
}
