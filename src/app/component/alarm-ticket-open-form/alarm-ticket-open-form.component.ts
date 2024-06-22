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

  ticketForm?: FormGroup;
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
  tasks: any[] = [];

  faultCodePrefixes: string[] = ['--None--', 'Standard Fault (F-)', 'Customer Issue Fault (C-)', 'PM Fault (P-)', 'SHEQ (S-)'];
  faultCategories: string[] = ['--None--', 'Batteries', 'Alarms', 'Cables', 'AC Aircon', 'Controller', 'RMS'];
  faultGroups: string[] = ['--None--', 'Fault AC Aircon', 'Fault AC Aircon', 'Fault AC Aircon', 'Fault Cables', 'Fault RMS'];
  faults: string[] = ['--None--', 'Others RMS', 'Low cooling', 'AVS', 'Compressor 24000BTU'];
  faultCodes: string[] = ['--None--', 'AN-01', 'AN-02', 'AN-03', 'AN-04'];
  types: string[] = ['--None--', 'Service',];
  spheres: string[] = ['--None--', 'PM'];
  partCategories: string[] = ['--None--'];
  partGroups: string[] = ['--None--'];
  parts: string[] = ['--None--'];
  partCodes: string[] = ['--None--'];


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

    this.ticketForm = this.fb.group({
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
      workNote: [null, []],
      faultCodePrefix: [''],
      faultCategory: [''],
      faultGroup: [''],
      fault: [''],
      faultCode: [''],
      partType: [''],
      spheres: [''],
      partCategory: [''],
      partGroup: [''],
      part: [''],
      partCode: [''],
      quantity: ['']
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
    this.ticketForm?.get('assignmentGroup')?.reset();
    this.ticketForm?.get('assignedTo')?.reset();
    this.ticketForm!.get('site')?.setValue(site);
    this.filteredAssignmentGroups = site?.userGroups;
    this.filteredAssignedTo = site?.users;

    if(this.filteredAssignmentGroups !== null && this.filteredAssignmentGroups !== undefined && this.filteredAssignmentGroups.length > 0){
      this.ticketForm?.get('assignmentGroup')?.setValue(this.filteredAssignmentGroups[0]);
    }

    if(this.filteredAssignedTo !== null && this.filteredAssignedTo !== undefined && this.filteredAssignedTo.length > 0){
      this.ticketForm?.get('assignedTo')?.setValue(this.filteredAssignedTo[0]);

    }

  }

  onAssignmentGroupInput(assignmentGroup: any): void {
    this.ticketForm!.get('assignmentGroup')?.setValue(assignmentGroup);

  }

  onAssignedToInput(assignedTo: any) {
    this.ticketForm!.get('assignedTo')?.setValue(assignedTo);

  }


  fetchSites(): void {
     this.siteService.getSites()
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

  loadTicketById(id: string) {
    this.ticketService.fetchTicketById(id!)
      .subscribe(
        response => {
          this.ticket = response;
          console.log(this.ticket)
          this.fetchTicketTasks(this.ticket.id);
          this.getFullImageURL();

          if (this.ticket !== undefined && this.ticket !== '' && this.ticket !== null) {
            const priority = this.priorities.find(v => v.value === this.ticket.priority);

            this.ticketForm?.get('number')?.setValue(this.ticket.reference);
            this.ticketForm?.get('priority')?.setValue(priority);
            this.ticketForm?.get('state')?.setValue(this.ticket.status);
            this.ticketForm?.get('shortDescription')?.setValue(this.ticket.shortDescription);
            this.ticketForm?.get('site')!.setValue(this.ticket?.site);
            this.ticketForm?.get('assignedTo')!.setValue(this.ticket?.user);
            this.ticketForm?.get('assignmentGroup')!.setValue(this.ticket?.userGroup);
            this.ticketForm?.get('shortDescription')?.setValue(this.ticket.shortDescription);
            this.ticketForm?.get('shortDescription')?.setValue(this.ticket.shortDescription);
            this.ticketForm?.get('faultCodePrefix')?.setValue(this.ticket.faultCodePrefix);
            this.ticketForm?.get('faultCategory')?.setValue(this.ticket.faultCategory);
            this.ticketForm?.get('faultGroup')?.setValue(this.ticket.faultGroup);
            this.ticketForm?.get('fault')?.setValue(this.ticket.fault);
            this.ticketForm?.get('faultCode')?.setValue(this.ticket.faultCode);
            this.ticketForm?.get('partType')?.setValue(this.ticket.partType);
            this.ticketForm?.get('spheres')?.setValue(this.ticket.separes);
            this.ticketForm?.get('partCategory')?.setValue(this.ticket.partCategory);
            this.ticketForm?.get('partGroup')?.setValue(this.ticket.partGroup);
            this.ticketForm?.get('part')?.setValue(this.ticket.part);
            this.ticketForm?.get('partCode')?.setValue(this.ticket.partCode);
            this.ticketForm?.get('quantity')?.setValue(this.ticket.quantity);
            this.ticketForm?.get('gpsLocation')?.setValue(this.ticket?.site?.address?.lat + ' , ' + this.ticket?.site?.address?.lng);
            this.ticket!.status !== 'ASSIGNED' && this.ticket!.status !== 'OPEN' ? this.ticketForm?.get('siteAccessRequest')?.setValue(this.ticket?.siteAccessRequest) : null;

            this.displaySubmit = false;
            this.ticketForm?.get('siteAccessRequest')?.disable();
            this.ticketForm!.get('number')?.disable();
            this.ticketForm!.get('state')?.disable();
            this.displayForm = true;

            if (this.ticket.status === this.TICKETSTATE.CLOSED || this.ticket.status === this.TICKETSTATE.WAITFORCLOSURE) {
              this.ticketForm!.disable()
            }


          } else {
            this.displayForm = true;
          }


        },
        error => console.log(error)

      )
  }

  fetchNumber(type: string): void {
    this.ticketService.getNumber(type)
      .subscribe(
        data => { },
        error => this.ticketForm!.get('number')?.setValue(error.error.text)
      );
  }



  filterOptions(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.siteOptions.filter(option =>
      option.toLowerCase().includes(filterValue)
    );
  }

  submitForm(): void {
    const data1 = {
      priority: this.ticketForm!.get('priority')?.value?.name,
      type: this.type,
      reference: this.ticketForm!.get('number')?.value,
      alarmCheckList: false,
      popFourTab: false,
      siteId: this.ticketForm!.get('site')?.value?.id,
      shortDescription: this.ticketForm!.get('shortDescription')?.value,
      user: this.ticketForm!.get('assignedTo')?.value?.id,
      userGroup: this.ticketForm!.get('assignmentGroup')?.value?.id,
      faultCodePrefix: this.ticketForm!.get('faultCodePrefix')?.value,
      faultCategory: this.ticketForm!.get('faultCategory')?.value,
      faultGroup: this.ticketForm!.get('faultGroup')?.value,
      fault: this.ticketForm!.get('fault')?.value,
      faultCode: this.ticketForm!.get('faultCode')?.value,
      partType: this.ticketForm!.get('partType')?.value,
      separes: this.ticketForm!.get('spheres')?.value,
      partCategory: this.ticketForm!.get('partCategory')?.value,
      partGroup: this.ticketForm!.get('partGroup')?.value,
      part: this.ticketForm!.get('part')?.value,
      partCode: this.ticketForm!.get('partCode')?.value,
      quantity: this.ticketForm!.get('quantity')?.value
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
          this.createMessage('error', error?.error?.message ?? "Erreur inconnue");

        }
      )
    } else {

      this.ticketService.create(data1)
        .subscribe(ticket => {
          console.log(ticket)
          this.ticketService.fetchRefNumber()
            .subscribe(
              data => {  },
              error => {

                const data = {
                  ticketId: ticket.id,
                  user: ticket?.user?.id,
                  userGroup: ticket?.userGroup?.id,
                  siteAccessRequest: error.error.text
                }
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
      cause: this.ticketForm?.get('shortDescription')?.value,
      resolutionComment: this.ticketForm?.get('description')?.value,
      workNotes: this.ticketForm?.get('workNote')?.value
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
        },
        error => {
          this.message.error(error?.error?.messages[0]??'Unknown Error')
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


  openTask(): void {

  }

}
