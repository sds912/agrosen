import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../service/task.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-ticket-task-form',
  templateUrl: './ticket-task-form.component.html',
  styleUrl: './ticket-task-form.component.css'
})
export class TicketTaskFormComponent {

  public taskForm!: FormGroup;
  public filteredSites: any[] = [];
  public filteredAssignmentGroups: any[] = [];
  public filteredAssignedTo: any[] = [];
  public filteredParents: any[] = [];
  public sourceTasks: any[] = [];
  public task: any;

  constructor(
    private fb: FormBuilder, 
    private route: ActivatedRoute,
    private taskService: TaskService,
    private message: NzMessageService
  ) {

    this.route.queryParamMap.subscribe(param => {
      const id: any = param.get('id');
      if(id !== null && id !== undefined && id !== ''){
         this.taskService.getTaskById(id)
         .subscribe(
          response => {
            const data = response;
            
            this.taskForm.patchValue({
              number: data.number,
              site: data.ticket?.siteAccessRequest || null,
              siteAccessRequest: data.ticket?.siteAccessRequest || null,
              priority: data.priority,
              additionalSiteVisiteRequired: data.additionalSiteVisiteRequired,
              state: data.status, // Assuming 'state' corresponds to 'status'
              assignmentGroup: null, // Assignment group is not present in the data
              assignedTo: data.user.username, // Assuming 'assignedTo' corresponds to 'username'
              shortDescription: data.shortDescription,
              description: data.description,
              resolution: data.resolution,
              additionalComments: data.additionalComments,
              sourceTask: data?.ticket?.reference,
              createdAt: data?.createdAt
            });
            
          },
          error => this.message.error(error?.error?.messages[0]??'Unknown Error')
         )
      }
    })
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
      additionalComments: [''],
      createdAt: []
    });
  }

  ngOnInit(): void {
    
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
