import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SiteService } from '../../service/site.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketService } from '../../service/ticket.service';
import { LoginService } from '../../service/login.service';
import { ROLE, TiCKET_STATE } from '../../shared/app-constants';
import { DomSanitizer } from '@angular/platform-browser';




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
  currentUser: any;
  TICKETSTATE = TiCKET_STATE;
  ROLE = ROLE;
  selectedFile: any | null = null;
  imgURL: any;
  tasks: any [] = [];


  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private message: NzMessageService,
    private ticketService: TicketService,
    private loginService: LoginService,
    private siteService: SiteService,
    private sanitizer: DomSanitizer) {

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
      assignmentGroup: ['', [Validators.required]],
      assignedTo: ['', [Validators.required]],
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
    this.currentUser = this.loginService.currentUser;
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

             this.loadTicketById(id);

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

  loadTicketById(id: string ){
    this.ticketService.fetchTicketById(id!)
    .subscribe(
      response => {
        this.ticket = response;
        console.log(this.ticket)
        this.fetchTicketTasks(this.ticket.id);
        this.getFullImageURL();

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
          this.ticket!.status !== 'ASSIGNED' && this.ticket!.status !== 'OPEN' ? this.alarmForm?.get('siteAccessRequest')?.setValue(this.ticket?.siteAccessRequest) : null;

          this.displaySubmit = false;
          this.alarmForm?.get('siteAccessRequest')?.disable();
          this.alarmForm!.get('number')?.disable();
          this.alarmForm!.get('state')?.disable();
          this.displayForm = true;

          if(this.ticket.status === this.TICKETSTATE.CLOSED || this.ticket.status === this.TICKETSTATE.WAITFORCLOSURE ){
            this.alarmForm!.disable()
          }


        } else {
          this.displayForm = true;
        }


      },
      error => console.log(error)

    )
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

      const data: any = this.ticket;
      data.type = this.type;
      console.log(data)
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
                this.ticketService.assign(data).subscribe((response: any) => {
                  console.log(response)
                  this.createMessage('success', "Ticket créé avec succès");
                  this.router.navigate(['admin/alarms/tickets'], { queryParams: { type: this.type } });
                },
                  error => this.createMessage('error', error?.error?.messages[0] ?? 'Unknown Error'))

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

  saveStatus(status: string) {
    const data = {
      status: status,
      cause: this.alarmForm?.get('shortDescription')?.value,
      resolutionComment: this.alarmForm?.get('description')?.value,
      workNotes: this.alarmForm?.get('workNote')?.value
    }

    this.ticketService.updateStatus(this.ticket.id, data)
      .subscribe(response => {
        this.message.success(status !== this.TICKETSTATE.CANCEL ? 'Closed Successfully' : 'Canceled');
        this.loadTicketById(this.ticket.id);

      },
        error => {
          this.message.error(error.error?.messages[0] ?? 'Unknown Error')
        })
  }

  fetchTicketTasks(id: string) {
    this.ticketService.getTicketTasks(id)
      .subscribe(
        response => {
         this.tasks = response.data;
         console.log(this.tasks);
         
        },
        error => {
          console.log(error);
        }
      )
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];

    this.onUpload(this.ticket?.id);

  }

  onUpload(id: string) {
    if (!this.selectedFile) {
      alert('Please select a file first');
      return;
    }

    const uploadData = new FormData();
    uploadData.append('file', this.selectedFile, this.selectedFile.name);

    this.ticketService.uploadImage(uploadData, id)
      .subscribe(
        response => {
          console.log(response);
          this.message.success('Uploaded Successfully !');
          this.loadTicketById(this.ticket.id)
        },
        error => {
          console.error(error);
          this.message.error(error?.error?.messages[0] ?? 'Upload Failed')
        }
      );
  }

  getFullImageURL() {
    this.ticket.documents.map((data: any) => {
      this.ticketService.loadImage(data.fileName)
        .subscribe(image => {
          data.imageData = this.convertToBase64(image);
        },
          error => {
           
          this.message.error('Flail to load images');

          })
    })

  }

  convertToBase64(buffer: ArrayBuffer): any {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return 'data:image/png;base64,' + btoa(binary);
  }

}
