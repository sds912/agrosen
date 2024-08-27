import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ROLE, TiCKET_STATE, TICKET_TYPE} from '../../shared/app-constants';
import {HttpClientXsrfModule} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/message';
import {TicketService} from '../../service/ticket.service';
import {LoginService} from '../../service/login.service';
import {SiteService} from '../../service/site.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({selector: 'app-alarm-ticket-pm-form', templateUrl: './alarm-ticket-pm-form.component.html', styleUrl: './alarm-ticket-pm-form.component.css'})
export class AlarmTicketPmFormComponent {

	loading : boolean = false;
	priorities : any[] = [
		{
			name: 'CRITICAL',
			value: '1'
		}, {
			name: 'HIGH',
			value: '2'
		}, {
			name: 'MODERATE',
			value: '3'
		}, {
			name: 'LOW',
			value: '4'
		}

	]

	ticketForm?: FormGroup;
	reference : string = "";

	searchControl = this.fb.control('');
	filteredSites : any[] = [];
	filteredSiteAccessRequests : any[] = [];
	filteredTaskRefs : any[] = [];
	siteOptions : string[] = [];
	filteredAssignmentGroups : any[] = [];
	filteredAssignedTo : any[] = [];
	ticket : any;
	displaySubmit : boolean = true;
	displayForm : boolean = false;
	type !: string;
	currentUser : any;
	TICKETSTATE = TiCKET_STATE;
	TICKETTYPE = TICKET_TYPE;
	ROLE = ROLE;
	selectedFile : any | null = null;
	imgURL : any;
	tasks : any[] = [];

	faultCodePrefixes : string[] = ['--None--', 'Yes', 'No'];
	faultCategories : string[] = [
		'--None--',
		'Resistive',
		'Pressure',
		'Note Installed',
		'Other'
	];
	faultGroups : string[] = ['--None--', 'Cabo', 'Delta Controls', 'Other'];
	faults : string[] = [
		'--None--',
		'24-24-000',
		'DSGE-25',
		'ES-2F',
		'Other'
	];
	faultCodes : string[] = ['--None--', 'Yes', 'No'];
	types : string[] = ['--None--', 'Smart', 'Regular', 'No Meter'];
	spheres : string[] = [
		'--None--',
		'EDMI',
		'Iltron',
		'Inhemeter',
		'Landy & Gir',
		'Genus',
		'Socomec',
		'Veto',
		'Other'
	];
	partCategories : string[] = [
		'--None--',
		'ACE900A',
		'CI4(PDHO)',
		'DT862',
		'EUPR110',
		'MK10',
		'MK29D',
		'01B1',
		'Other'
	];

	acServices : string[] = ['--None--', 'Other'];
	dgServices : string[] = ['--None--', 'Other'];


	constructor(private fb : FormBuilder, private route : ActivatedRoute, private router : Router, private message : NzMessageService, private ticketService : TicketService, private loginService : LoginService, private siteService : SiteService) {

		this.ticketForm = this.fb.group({
			number: [
				null,
				[Validators.required]
			],
			site: [
				null,
				[Validators.required]
			],
			siteAccessRequest: [
				null, []
			],
			gpsLocation: [
				'', []
			],
			taskReference: [
				null, []
			],
			state: [
				"OPEN",
				[Validators.required]
			],
			assignmentGroup: [
				'',
				[Validators.required]
			],
			assignedTo: [
				'',
				[Validators.required]
			],
			sheduleDate: [
				'', []
			],
			reSheduleDate: [
				'', []
			],
			actualDate: [
				'', []
			],
			reSheduleBy: [
				'', []
			],
			shortDescription: [
				null, []
			],
			partShortDescription: [
				null, []
			],
			description: [
				null, []
			],
			workNote: [
				null, []
			],
			additionalInfo: this.fb.group(
				{
					acPowerAndGenerator: [false],
					alarmCheckList: [false],
					recordedMetricsReadingAndRemarks: [false],
					tower: [false],
					airConditioning: [false],
					janitorial: [false],
					rectifier: [false],
					solar: [false],
					rms: [false],
					janTab: [],
					acpgTab: [],
					rectifierTab: [],
					acTab: [],
					towerTab: [],
					metricsTab: [],
					solarTab: [],
					alarmTab: [],
					acService: [],
					dgService: [],
					whenTakingTheseReading: [''],
					fuelProbType: [''],
					fuelProbManufacturer: [''],
					fuelProbModelNumber: [''],
					fuelLevelDgController: [''],
					fuelLevelRms: [''],
					generatorRunHours: [''],
					dgOutput: [''],
					gridMeterUnit: [''],
					gridMeterConfigured: [''],
					gridMeterType: [''],
					gridMeterManufacturer: [''],
					gridMeterModelNumber: ['']
				}
			)
		});


		this.searchControl.valueChanges.subscribe(value => {
			this.filteredSites = this.filterOptions(value !);
		});


	}

	getReference(): void {
		this.ticketService.fetchRefNumber().subscribe(res => {}, error => this.reference = error.error.text)
	}


	ngOnInit(): void {
		this.currentUser = this.loginService.currentUser;
		this.fetchSites();
		this.ticketForm ?. get('number') ?. disable();
		this.ticketForm ?. get('shortDescription') ?. disable();
		this.ticketForm ?. get('siteAccessRequest') ?. disable();
		this.ticketForm !.get('state') ?. disable();
		this.getReference();
	}

	onSiteInput(site : any): void {
		this.ticketForm ?. get('assignmentGroup') ?. reset();
		this.ticketForm ?. get('assignedTo') ?. reset();
		this.ticketForm !.get('site') ?. setValue(site);
		this.filteredAssignmentGroups = site ?. userGroups;

		if(this.type === TICKET_TYPE.PMA){
			this.filteredAssignedTo = site ?. users?.filter((v:any) => v.role === ROLE.FS);
         
		}else{
			this.filteredAssignedTo = site ?. users;

		}

		if (this.filteredAssignmentGroups !== null && this.filteredAssignmentGroups !== undefined && this.filteredAssignmentGroups.length > 0) {
			this.ticketForm ?. get('assignmentGroup') ?. setValue(this.filteredAssignmentGroups[0]);
		}

		if (this.filteredAssignedTo !== null && this.filteredAssignedTo !== undefined && this.filteredAssignedTo.length > 0) {
			this.ticketForm ?. get('assignedTo') ?. setValue(this.filteredAssignedTo[0]);

		}

	}

	onAssignmentGroupInput(assignmentGroup : any): void {
		this.ticketForm !.get('assignmentGroup') ?. setValue(assignmentGroup);

	}

	onAssignedToInput(assignedTo : any) {
		this.ticketForm !.get('assignedTo') ?. setValue(assignedTo);

	}


	fetchSites(): void {
		this.loading = true;
		this.siteService.getSites().subscribe((response : any) => {
			this.filteredSites = response.data;

			this.route.queryParamMap.subscribe(params => {
				const id = params.get('id');
				this.type = params.get('type')!;
				this.loading = false;


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


		}, error => {
			this.loading = false;

			console.error('There was an error fetching the site options!', error)
		});
	}

	loadTicketById(id : string) {
		this.ticketService.fetchTicketById(id !).subscribe(response => {
			this.ticket = response;
			//console.log(this.filteredSites)
			this.onSiteInput(this.filteredSites?.filter((v) => v.id === this.ticket?.site?.id)[0]);
			this.fetchTicketTasks(this.ticket.id);

			if (this.ticket !== undefined && this.ticket !== '' && this.ticket !== null) {
				const priority = this.priorities.find(v => v.value === this.ticket.priority);

				this.ticketForm ?. get('number') ?. setValue(this.ticket.reference);
				this.ticketForm ?. get('state') ?. setValue(this.ticket.status);
				this.ticketForm ?. get('shortDescription') ?. setValue(this.ticket.shortDescription);
				this.ticketForm ?. get('site')!.setValue(this.ticket ?. site);
				this.ticketForm ?. get('assignedTo')!.setValue(this.ticket ?. user);
				this.ticketForm ?. get('assignmentGroup')!.setValue(this.ticket ?. userGroup);
				this.ticketForm ?. get('shortDescription') ?. setValue(this.ticket.shortDescription);
				this.ticketForm ?. get('gpsLocation') ?. setValue(this.ticket ?. site ?. address ?. lat + ' , ' + this.ticket ?. site ?. address ?. lng);

				if (this.ticket.status !== 'ASSIGNED' && this.ticket.status !== 'OPEN') {
					this.ticketForm ?. get('siteAccessRequest') ?. setValue(this.ticket ?. siteAccessRequest);
				}

				this.ticketForm ?. get('taskReference') ?. setValue(this.ticket.taskReference);
				this.ticketForm ?. get('sheduleDate') ?. setValue(this.ticket.sheduleDate);
				this.ticketForm ?. get('reSheduleDate') ?. setValue(this.ticket.reSheduleDate);
				this.ticketForm ?. get('actualDate') ?. setValue(this.ticket.actualWODate);
				this.ticketForm ?. get('workNote') ?. setValue(this.ticket.workNotes);

				// Additional Info
				this.ticketForm ?. get('additionalInfo.acPowerAndGenerator') ?. setValue(this.ticket.additionalInfo.acPowerAndGenerator);
				this.ticketForm ?. get('additionalInfo.alarmCheckList') ?. setValue(this.ticket.additionalInfo.alarmCheckList);
				this.ticketForm ?. get('additionalInfo.recordedMetricsReadingAndRemarks') ?. setValue(this.ticket.additionalInfo.recordedMetricsReadingAndRemarks);
				this.ticketForm ?. get('additionalInfo.tower') ?. setValue(this.ticket.additionalInfo.tower);
				this.ticketForm ?. get('additionalInfo.airConditioning') ?. setValue(this.ticket.additionalInfo.airConditioning);
				this.ticketForm ?. get('additionalInfo.janitorial') ?. setValue(this.ticket.additionalInfo.janitorial);
				this.ticketForm ?. get('additionalInfo.rectifier') ?. setValue(this.ticket.additionalInfo.rectifier);
				this.ticketForm ?. get('additionalInfo.solar') ?. setValue(this.ticket.additionalInfo.solar);
				this.ticketForm ?. get('additionalInfo.rms') ?. setValue(this.ticket.additionalInfo.rms);
				this.ticketForm ?. get('additionalInfo.janTab') ?. setValue(this.ticket.additionalInfo.janTab);
				this.ticketForm ?. get('additionalInfo.acpgTab') ?. setValue(this.ticket.additionalInfo.acpgTab);
				this.ticketForm ?. get('additionalInfo.rectifierTab') ?. setValue(this.ticket.additionalInfo.rectifierTab);
				this.ticketForm ?. get('additionalInfo.acTab') ?. setValue(this.ticket.additionalInfo.acTab);
				this.ticketForm ?. get('additionalInfo.towerTab') ?. setValue(this.ticket.additionalInfo.towerTab);
				this.ticketForm ?. get('additionalInfo.metricsTab') ?. setValue(this.ticket.additionalInfo.metricsTab);
				this.ticketForm ?. get('additionalInfo.solarTab') ?. setValue(this.ticket.additionalInfo.solarTab);
				this.ticketForm ?. get('additionalInfo.alarmTab') ?. setValue(this.ticket.additionalInfo.alarmTab);
				this.ticketForm ?. get('additionalInfo.acService') ?. setValue(this.ticket.additionalInfo.acService);
				this.ticketForm ?. get('additionalInfo.dgService') ?. setValue(this.ticket.additionalInfo.dgService);
				this.ticketForm ?. get('additionalInfo.whenTakingTheseReading') ?. setValue(this.ticket.additionalInfo.whenTakingTheseReading);
				this.ticketForm ?. get('additionalInfo.fuelProbType') ?. setValue(this.ticket.additionalInfo.fuelProbType);
				this.ticketForm ?. get('additionalInfo.fuelProbManufacturer') ?. setValue(this.ticket.additionalInfo.fuelProbManufacturer);
				this.ticketForm ?. get('additionalInfo.fuelProbModelNumber') ?. setValue(this.ticket.additionalInfo.fuelProbModelNumber);
				this.ticketForm ?. get('additionalInfo.fuelLevelDgController') ?. setValue(this.ticket.additionalInfo.fuelLevelDgController);
				this.ticketForm ?. get('additionalInfo.fuelLevelRms') ?. setValue(this.ticket.additionalInfo.fuelLevelRms);
				this.ticketForm ?. get('additionalInfo.generatorRunHours') ?. setValue(this.ticket.additionalInfo.generatorRunHours);
				this.ticketForm ?. get('additionalInfo.dgOutput') ?. setValue(this.ticket.additionalInfo.dgOutput);
				this.ticketForm ?. get('additionalInfo.gridMeterUnit') ?. setValue(this.ticket.additionalInfo.gridMeterUnit);
				this.ticketForm ?. get('additionalInfo.gridMeterConfigured') ?. setValue(this.ticket.additionalInfo.gridMeterConfigured);
				this.ticketForm ?. get('additionalInfo.gridMeterType') ?. setValue(this.ticket.additionalInfo.gridMeterType);
				this.ticketForm ?. get('additionalInfo.gridMeterManufacturer') ?. setValue(this.ticket.additionalInfo.gridMeterManufacturer);
				this.ticketForm ?. get('additionalInfo.gridMeterModelNumber') ?. setValue(this.ticket.additionalInfo.gridMeterModelNumber);

				this.displaySubmit = false;
				this.displayForm = true;

				if (this.ticket.status === this.TICKETSTATE.CLOSED || this.ticket.status === this.TICKETSTATE.WAITFORCLOSURE) {
					this.ticketForm !.disable()
				}


			} else {
				this.displayForm = true;
			}

			this.loading = false;
		}, error => {
			console.log(error);
			this.loading = false;
		})
	}

	fetchNumber(type : string): void {
		this.ticketService.getNumber(type).subscribe(data => {
			this.loading = false;
		}, error => {
			this.ticketForm !.get('number') ?. setValue(error.error.text);
			this.loading = false;

		});
	}


	filterOptions(value : string): string[]{
		const filterValue = value.toLowerCase();
		return this.siteOptions.filter(option => option.toLowerCase().includes(filterValue));
	}

	submitForm(): void { // Construct the JSON object as per your requirements
		const ticketData = {
			type: this.type,
			reference: this.ticketForm !.get('number') ?. value,
			siteId: this.ticketForm !.get('site') ?. value ?. id,
			user: this.ticketForm !.get('assignedTo') ?. value ?. id,
			userGroup: this.ticketForm !.get('assignmentGroup') ?. value ?. id,
			description: this.ticketForm ?. get('description') ?. value,
			shortDescription: this.ticketForm ?. get('shortDescription') ?. value,
			siteAccessRequest: this.ticketForm ?. get('siteAccessRequest') ?. value,
			taskReference: this.ticketForm ?. get('taskReference') ?. value,
			sheduleDate: this.ticketForm ?. get('sheduleDate') ?. value,
			reSheduleDate: this.ticketForm ?. get('reSheduleDate') ?. value,
			workNotes: this.ticketForm ?. get('workNote') ?. value,
			additionalInfo: {
				acPowerAndGenerator: this.ticketForm ?. get('additionalInfo.acPowerAndGenerator') ?. value,
				alarmCheckList: this.ticketForm ?. get('additionalInfo.alarmCheckList') ?. value,
				recordedMetricsReadingAndRemarks: this.ticketForm ?. get('additionalInfo.recordedMetricsReadingAndRemarks') ?. value,
				tower: this.ticketForm ?. get('additionalInfo.tower') ?. value,
				airConditioning: this.ticketForm ?. get('additionalInfo.airConditioning') ?. value,
				janitorial: this.ticketForm ?. get('additionalInfo.janitorial') ?. value,
				rectifier: this.ticketForm ?. get('additionalInfo.rectifier') ?. value,
				solar: this.ticketForm ?. get('additionalInfo.solar') ?. value,
				rms: this.ticketForm ?. get('additionalInfo.rms') ?. value,
				janTab: this.ticketForm ?. get('additionalInfo.janTab') ?. value,
				acpgTab: this.ticketForm ?. get('additionalInfo.acpgTab') ?. value,
				rectifierTab: this.ticketForm ?. get('additionalInfo.rectifierTab') ?. value,
				acTab: this.ticketForm ?. get('additionalInfo.acTab') ?. value,
				towerTab: this.ticketForm ?. get('additionalInfo.towerTab') ?. value,
				metricsTab: this.ticketForm ?. get('additionalInfo.metricsTab') ?. value,
				solarTab: this.ticketForm ?. get('additionalInfo.solarTab') ?. value,
				alarmTab: this.ticketForm ?. get('additionalInfo.alarmTab') ?. value,
				acService: this.ticketForm ?. get('additionalInfo.acService') ?. value,
				dgService: this.ticketForm ?. get('additionalInfo.dgService') ?. value,
				whenTakingTheseReading: this.ticketForm ?. get('additionalInfo.whenTakingTheseReading') ?. value,
				fuelProbType: this.ticketForm ?. get('additionalInfo.fuelProbType') ?. value,
				fuelProbManufacturer: this.ticketForm ?. get('additionalInfo.fuelProbManufacturer') ?. value,
				fuelProbModelNumber: this.ticketForm ?. get('additionalInfo.fuelProbModelNumber') ?. value,
				fuelLevelDgController: this.ticketForm ?. get('additionalInfo.fuelLevelDgController') ?. value,
				fuelLevelRms: this.ticketForm ?. get('additionalInfo.fuelLevelRms') ?. value,
				generatorRunHours: this.ticketForm ?. get('additionalInfo.generatorRunHours') ?. value,
				dgOutput: this.ticketForm ?. get('additionalInfo.dgOutput') ?. value,
				gridMeterUnit: this.ticketForm ?. get('additionalInfo.gridMeterUnit') ?. value,
				gridMeterConfigured: this.ticketForm ?. get('additionalInfo.gridMeterConfigured') ?. value,
				gridMeterType: this.ticketForm ?. get('additionalInfo.gridMeterType') ?. value,
				gridMeterManufacturer: this.ticketForm ?. get('additionalInfo.gridMeterManufacturer') ?. value,
				gridMeterModelNumber: this.ticketForm ?. get('additionalInfo.gridMeterModelNumber') ?. value
			}
		};
		// Log the JSON data or send it to the server
		console.log('Form Data:', ticketData);


		this.loading = true;


		if (this.ticket) {

			const data: any = this.ticket;
			data.type = this.type;
			//console.log(data)
			this.ticketService.acceptAssign(data).subscribe(response => {
				this.createMessage('success', "Ticket accepté avec succès");
				window.location.reload();
				this.loading = false;


			}, error => {
				this.createMessage('error', error ?. error ?. message ?? "Erreur inconnue");
				this.loading = false;


			})
		} else {

			this.ticketService.create(ticketData).subscribe(ticket => {

				this.createMessage('success', "Ticket créé avec succès");
						this.router.navigate(['admin/alarms/tickets'], {
							queryParams: {
								type: this.type
							}
						});
						this.loading = false;
				
				// this.ticketService.fetchRefNumber().subscribe(res => {
				// 	const data = {
				// 		ticketId: ticket.id,
				// 		user: ticket ?. user ?. id,
				// 		userGroup: ticket ?. userGroup ?. id,
				// 		siteAccessRequest: res?.number
				// 	}
				// 	console.log(data);
				// 	this.createMessage('success', "Ticket créé avec succès");
				// 		this.router.navigate(['admin/alarms/tickets'], {
				// 			queryParams: {
				// 				type: this.type
				// 			}
				// 		});
				// 		this.loading = false;
					
				// 	this.ticketService.assign(data).subscribe((response : any) => {
				// 		console.log(response)
				// 		this.createMessage('success', "Ticket créé avec succès");
				// 		this.router.navigate(['admin/alarms/tickets'], {
				// 			queryParams: {
				// 				type: this.type
				// 			}
				// 		});
				// 		this.loading = false;

				// 	}, error => {
				// 		this.createMessage('error', error ?. error ?. messages[0] ?? 'Unknown Error');
				// 		this.loading = false;

				// 	})
						
				// }, error => {
               
				// 	this.createMessage('error', error ?. error ?. message ?? "Erreur inconnue");
				// console.log(error);
				// this.loading = false;

				// });


			}, error => {
				this.createMessage('error', error ?. error ?. message ?? "Erreur inconnue");
				console.log(error);
				this.loading = false;


			})
		}

	}


	createMessage(type : string, message : string): void {
		this.message.create(type, message);
	}

	saveStatus(status : string) {
		const data = {
			status: status,
			cause: this.ticketForm ?. get('shortDescription') ?. value,
			resolutionComment: this.ticketForm ?. get('description') ?. value,
			workNotes: this.ticketForm ?. get('workNote') ?. value
		}

		this.ticketService.updateStatus(this.ticket.id, data).subscribe(response => {
			this.message.success(status !== this.TICKETSTATE.CANCEL ? 'Closed Successfully' : 'Canceled');
			this.loadTicketById(this.ticket.id);

		}, error => {
			this.message.error(error.error ?. messages[0] ?? 'Unknown Error')
		})
	}

	fetchTicketTasks(id : string) {
		this.ticketService.getTicketTasks(id).subscribe(response => {
			this.tasks = response.data;
		}, error => {
			this.message.error(error ?. error ?. messages[0] ?? 'Unknown Error')
		})
	}

	


	openTask(): void {}


	taskController(): boolean{
		var result =  this.tasks.find((t) => t.status === 'OPEN');
		return !(result === undefined && this.tasks.length == 2);
	}

	updateTicket = () => {
		const data: any = {
		  ticketId: this.ticket.id,
		  user:  this.ticketForm!.get('assignedTo')?.value?.id,
		  userGroup:  this.ticketForm!.get('assignmentGroup')?.value?.id
		}
	   
		this.ticketService.reassignedTicket(data).subscribe(
		  response => {
			this.createMessage('success', "Ticket réassigné avec succès");
			window.location.reload();
			this.loading = false;
	
	
		  },
		  error => {
			this.createMessage('error', error?.error?.message ?? "Erreur inconnue");
			this.loading = false;
	
	
		  }
		)
	  }


}
