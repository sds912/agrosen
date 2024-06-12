import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SiteService } from '../../service/site.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketService } from '../../service/ticket.service';
import { LoginService } from '../../service/login.service';



@Component({
  selector: 'app-alarm-ticket-open-form',
  templateUrl: './alarm-ticket-open-form.component.html',
  styleUrls: ['./alarm-ticket-open-form.component.css']
})
export class AlarmTicketOpenFormComponent implements OnInit {

  priorities: any[] = [
    {
      name: 'CRITICAL',
      value: '1'
    },
    {
      name: 'HIGH',
      value: '2'
    },
    {
      name: 'MODERATE',
      value: '3'
    },
    {
      name: 'LOW',
      value: '4'
    }

  ]

  alarmForm?: FormGroup;
  searchControl = this.fb.control('');
  filteredSites: any[] = [];
  filteredSiteAccessRequests: any[] = [];
  filteredTaskRefs: any[] = [];
  siteOptions: string[] = [];
  filteredAssignmentGroups: any[] = [];
  filteredAssignedTo: any[] = [];
  ticket: any;
  displaySubmit: boolean = true;
  displayForm: boolean = false;
  type!: string;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private message: NzMessageService,
    private ticketService: TicketService,
    private loginService: LoginService,
    private siteService: SiteService) {

    this.alarmForm = this.fb.group({
      number: [null, [Validators.required]],
      site: [null, [Validators.required]],
      siteAccessRequest: [null, []],
      priority: ['1', [Validators.required]],
      alarmChecklist: [false],
      p0P4Tab: [false],
      swoAutoCreated: [false],
      taskReference: [null, []],
      woDate: [null, []],
      state: ["OPEN", [Validators.required]],
      assignmentGroup: [null, [Validators.required]],
      assignedTo: [null, [Validators.required]],
      gpsLocation: [null, []],
      shortDescription: [null, []],
      partShortDescription: [null, []],
      description: [null, []],
      workNote: [null, []]
    });



    this.searchControl.valueChanges.subscribe(value => {
      this.filteredSites = this.filterOptions(value!);
    });



  }

  ngOnInit(): void {
    this.fetchSites();

  }

  onSiteInput(site: any): void {
    this.alarmForm!.get('site')?.setValue(site);
    console.log(site)
    this.filteredAssignmentGroups = site?.userGroups;
    this.filteredAssignedTo = site?.users;
  }

  onAssignmentGroupInput(assignmentGroup: any): void {
    this.alarmForm!.get('assignmentGroup')?.setValue(assignmentGroup);

  }

  onAssignedToInput(assignedTo: any) {
    this.alarmForm!.get('assignedTo')?.setValue(assignedTo);

  }


  fetchSites(): void {
    this.http.get<any>('http://62.171.177.19:3001/api/sites')
      .subscribe(
        (response: any) => {
          this.filteredSites = response.data;

          this.route.queryParamMap.subscribe(params => {
            const id = params.get('id');
            this.type = params.get('type')!;

            if (id !== undefined && id !== null) {

              this.ticketService.fetchTicketById(id!)
                .subscribe(
                  response => {
                    this.ticket = response;
                    console.log(this.ticket)
                    if (this.ticket !== undefined && this.ticket !== '' && this.ticket !== null) {
                      const priority = this.priorities.find(v => v.value === this.ticket.priority);

                      this.alarmForm?.get('number')?.setValue(this.ticket.reference);
                      this.alarmForm?.get('priority')?.setValue(priority);
                      this.alarmForm?.get('state')?.setValue(this.ticket.status);
                      this.alarmForm?.get('shortDescription')?.setValue(this.ticket.shortDescription);
                      this.alarmForm?.get('site')!.setValue(this.ticket?.site);
                      this.alarmForm?.get('assignedTo')!.setValue(this.ticket?.user);
                      this.alarmForm?.get('assignmentGroup')!.setValue(this.ticket?.userGroup);
                      this.alarmForm?.get('shortDescription')?.setValue(this.ticket.shortDescription);
                      this.alarmForm?.get('shortDescription')?.setValue(this.ticket.shortDescription);
                      this.alarmForm?.get('gpsLocation')?.setValue(this.ticket?.site?.address?.lat + ' , ' + this.ticket?.site?.address?.lng);
                      this.ticket!.status !== 'ASSIGNED' && this.ticket!.status !== 'OPEN' ? this.alarmForm?.get('siteAccessRequest')?.setValue(this.ticket?.siteAccessRequest): null;
                    
                      this.displaySubmit = false;
                      this.alarmForm?.get('siteAccessRequest')?.disable();
                      this.alarmForm!.get('number')?.disable();
                      this.alarmForm!.get('state')?.disable();
                      this.displayForm = true;


                    } else {
                      this.displayForm = true;
                    }


                  },
                  error => console.log(error)

                )

            } else {

              if (this.type !== undefined && this.type !== null) {
                this.displayForm = true;
                this.fetchNumber(this.type);
                // this.initForm();

              }



            }


          })


        },
        error => console.error('There was an error fetching the site options!', error)
      );
  }

  fetchNumber(type: string): void {
    console.log('fetch')
    this.http.get<any>(`http://62.171.177.19:3001/api/tickets/generate/reference?type=${type}`, { responseType: "json" })
      .subscribe(
        data => { console.log(data) },
        error => this.alarmForm!.get('number')?.setValue(error.error.text)
      );
  }

 

  filterOptions(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.siteOptions.filter(option =>
      option.toLowerCase().includes(filterValue)
    );
  }

  submitForm(): void {
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

    console.log(this.alarmForm!.value)

    const data1 = {
      priority: this.alarmForm!.get('priority')?.value?.name,
      type: this.type,
      reference: this.alarmForm!.get('number')?.value,
      alarmCheckList: false,
      popFourTab: false,
      siteId: this.alarmForm!.get('site')?.value?.id,
      shortDescription: this.alarmForm!.get('shortDescription')?.value,
      user: this.alarmForm!.get('assignedTo')?.value?.id,
      userGroup: this.alarmForm!.get('assignmentGroup')?.value?.id,

    }

    if (this.ticket) {
     const data = this.ticket;
      this.ticketService.acceptAssign(data).subscribe(
        response => {
          this.createMessage('success', "Ticket accepté avec succès");
          window.location.reload()

        },
        error => {
          console.log(error);
          this.createMessage('error', error?.error?.message ?? "Erreur inconnue");

        }
      )
    } else {

      console.log(data1);

       this.ticketService.create(data1)
        .subscribe(ticket => {
          console.log(ticket)
          this.ticketService.fetchRefNumber()
          .subscribe(
            data => { console.log(data) },
            error => {

              const data = {
                ticketId: ticket.id,
                user: ticket?.user?.id,
                userGroup: ticket?.userGroup?.id,
                siteAccessRequest: error.error.text
              }
              console.log()
              this.ticketService.assign(data).subscribe((response: any) =>{
              console.log(response)
              this.createMessage('success', "Ticket créé avec succès");
             this.router.navigate(['admin/alarms/tickets'], { queryParams: { type: this.type } });
              },
            error => this.createMessage('error', error?.error?.messages[0]??'Unknown Error'))

            }
          );
         
        
        },
          error => {
            this.createMessage('error', error?.error?.message ?? "Erreur inconnue");
            console.log(error);

          }

        )
    }

  }


  createMessage(type: string, message: string): void {
    this.message.create(type, message);
  }
}
