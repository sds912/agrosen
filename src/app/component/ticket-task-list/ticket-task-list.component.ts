import { Component, Input, OnInit } from '@angular/core';

interface TicketTask {
  id: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string | null;
  isDeleted: boolean;
  number: string;
  status: string;
  priority: string;
  type: string;
  cause: string | null;
  description: string;
  shortDescription: string;
  additionalComments: string | null;
  additionalSiteVisiteRequired: boolean;
  resolution: string | null;
  userId: string;
}

@Component({
  selector: 'app-ticket-task-list',
  templateUrl: './ticket-task-list.component.html',
  styleUrls: ['./ticket-task-list.component.css']
})
export class TicketTaskListComponent implements OnInit {
 @Input() listOfTicketTasks: TicketTask[] = [];
 @Input() ticket: any ;

  constructor() { }

  ngOnInit(): void {

    console.log(this.ticket);
    
  }
}
