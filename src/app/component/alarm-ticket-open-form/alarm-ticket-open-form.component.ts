import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { environment } from '../../../environments/environment.development';
import { error } from '@ant-design/icons-angular';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-alarm-ticket-open-form',
  templateUrl: './alarm-ticket-open-form.component.html',
  styleUrls: ['./alarm-ticket-open-form.component.css']
})
export class AlarmTicketOpenFormComponent implements OnInit {
  
  alarmForm?: FormGroup;
  searchControl = this.fb.control('');
  filteredSites: any[] = [];
  filteredSiteAccessRequests: any[] = [];
  filteredTaskRefs: any[] = [];
  siteOptions: string[] = [];
  filteredAssignmentGroups: any[] = [];
  filteredAssignedTo: any[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient, private message: NzMessageService) {
    this.alarmForm = this.fb.group({
      number: [null, [Validators.required]],
      site: [null, [Validators.required]],
      siteAccessRequest: [null, [Validators.required]],
      priority: [null, [Validators.required]],
      alarmChecklist: [false],
      p0P4Tab: [false],
      swoAutoCreated: [false],
      taskReference: [null, [Validators.required]],
      woDate: [null, [Validators.required]],
      state: ["Open", [Validators.required]],
      assignmentGroup: [null, [Validators.required]],
      assignedTo: [null, [Validators.required]],
      gpsLocation: [null, [Validators.required]],
      shortDescription: [null, [Validators.required]],
      partShortDescription: [null, [Validators.required]],
      description: [null, [Validators.required]],
      workNote: [null, [Validators.required]]
    });

    this.searchControl.valueChanges.subscribe(value => {
      this.filteredSites = this.filterOptions(value!);
    });
  }

  ngOnInit(): void {
    this.fetchSites();
    this.fetchNumber();
    this.alarmForm!.get('site')?.valueChanges.subscribe(value => {
      const site = this.filteredSites.filter(v => v.siteId === value)[0];

      
      this.filteredAssignmentGroups = site.userGroups;
      if(this.filteredAssignmentGroups !== undefined && this.filteredAssignmentGroups.length === 1){
        this.alarmForm!.get('assignmentGroup')?.setValue(this.filteredAssignmentGroups[0].type)
      }

      this.filteredAssignedTo = site.users;

      const fUsers = this.filteredAssignedTo.filter(v => v.role === this.alarmForm!.get('assignmentGroup')?.value );

      if(fUsers !== undefined && fUsers.length > 0){
        this.alarmForm!.get('assignedTo')?.setValue(fUsers[0].firstName + " " + fUsers[0].lastName )

      }
    });
  }

  initForm(): void {
    
  }
  fetchSites(): void {
    console.log('fetch')
    this.http.get<any>('http://62.171.177.19:3001/api/sites')
      .subscribe(
        (response: any) => {
          this.filteredSites = response.data;
          console.log(response.data)
          },
        error => console.error('There was an error fetching the site options!', error)
      );
  }

  fetchNumber(): void{
    console.log('fetch')
    this.http.get<any>('http://62.171.177.19:3001/api/tickets/generate/site-access-request', {responseType: "json"})
      .subscribe(
        data => {console.log(data)},
        error => this.alarmForm!.get('number')?.setValue(error.error.text)
      );
  }

  onSiteChange(site: any): void {
    console.log(site)
  }

  filterOptions(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.siteOptions.filter(option =>
      option.toLowerCase().includes(filterValue)
    );
  }

  submitForm(): void {
    console.log(this.alarmForm!.value);

    const data = {
      priority: this.alarmForm!.get('priority')?.value,
      cause: "test",
      description: this.alarmForm!.get('description')?.value,
      shortDescription: this.alarmForm!.get('shortDescription')?.value,
      outage: true,
      outageDateStart: "2024-06-04T23:23:35.370Z",
      outageDateEnd: "2024-06-04T23:23:35.370Z",
      outageDuration: "string",
      resolutionComment: "string",
      counterIndex: "string",
      code: "string",
      dcVoltage: 0,
      fluentDC: 0,
      alarmId: "",
      user: this.alarmForm!.get('assignedTo')?.value,
      userGroup: this.alarmForm!.get('assignmentGroup')?.value,
      type: "test",
      reference: this.alarmForm!.get('partShortDescription')?.value,
      siteAccessRequest: "test",
      partDescription: this.alarmForm!.get('partShortDescription')?.value,
      taskReference: this.alarmForm!.get('taskReference')?.value,
      workNotes: this.alarmForm!.get('workNote')?.value,
      alarmCheckList: this.alarmForm!.get('alarmCheckList')?.value,
      popFourTab: false,
      siteId: this.alarmForm!.get('site')?.value
    };
    
    console.log(data);

  const data1 =  {
      priority: this.alarmForm!.get('priority')?.value,
      type: "SWO_TASK",
      reference: this.alarmForm!.get('number')?.value,
      alarmCheckList: false,
      popFourTab: false,
      siteId: "823b9d6b-91e5-4ca2-a6f1-16f19e28d721"
    }
     
    this.http.post(`${environment.BaseUrl}/tickets`, data1)
    .subscribe(response => {
      this.createMessage('success', "Ticket créé avec succès");

    },
     error => {
      this.createMessage('error', "Une erreur viens de se produire. Ressayez plus tard");
    }
     
    )

    if (this.alarmForm!.valid) {
      console.log('Form Value:', this.alarmForm!.value);
    } else {
      console.error('Form Invalid');
    }
  }


  createMessage(type: string, message: string): void {
    this.message.create(type, message);
  }
}
