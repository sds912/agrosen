import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
  @Input() ticket: any;

  public isVisible: boolean = false;
  public taskForm!: FormGroup;

  public filteredSites: any[] = [];
  public filteredAssignmentGroups: any[] = [];
  public filteredAssignedTo: any[] = [];
  public filteredParents: any[] = [];
  public sourceTasks: any[] = [];

  constructor(private fb: FormBuilder, public router: Router) {
    this.taskForm = this.fb.group({
      number: ['', Validators.required],
      site: [null, Validators.required],
      siteAccessRequest: [null],
      priority: [null, Validators.required],
      additionalSiteVisiteRequired: [false],
      state: ['', Validators.required],
      assignmentGroup: [null, Validators.required],
      assignedTo: [null, Validators.required],
      shortDescription: ['', Validators.required],
      description: ['', Validators.required],
      resolution: ['', Validators.required],
      additionalComments: ['']
    });
  }

  ngOnInit(): void {
    console.log(this.ticket);
  }

  public handleOk(): void {
    if (this.taskForm.valid) {
      // handle form submission
      console.log('Form submitted:', this.taskForm.value);
      this.isVisible = false;
    } else {
      // handle form validation errors
      console.log('Form is invalid:', this.taskForm.errors);
    }
  }

  public handleCancel(): void {
    this.isVisible = false;
  }

  onSiteInput(site: any): void {
    this.taskForm.get('site')?.setValue(site);
    this.filteredAssignmentGroups = site?.userGroups || [];
    this.filteredAssignedTo = site?.users || [];
  }

  onAssignmentGroupInput(assignmentGroup: any): void {
    this.taskForm.get('assignmentGroup')?.setValue(assignmentGroup);
  }

  onAssignedToInput(assignedTo: any): void {
    this.taskForm.get('assignedTo')?.setValue(assignedTo);
  }
}
