import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { TiCKET_STATE } from '../../shared/app-constants';
import { ActivatedRoute } from '@angular/router';

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
export class TicketManagementSteperComponent implements OnInit {

  constructor(private route: ActivatedRoute){

  }

  @Input() status: string = 'OPEN';

  TICKETSTATUS = TiCKET_STATE;

  ngOnInit(): void {
    
  }

  
  
}
