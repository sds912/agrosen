import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../service/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlarmesService } from '../../service/alarmes.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SiteService } from '../../service/site.service';
import { formatDate } from '../../shared/date-formater';
import { TiCKET_STATE } from '../../shared/app-constants';



@Component({
  selector: 'app-alarmes',
  templateUrl: './alarmes.component.html',
  styleUrl: './alarmes.component.css'
})
export class AlarmesComponent implements OnInit {

alarmStatus: { label: string, value: string }[] = [
  { label: 'WORK IN PROGRESS', value: TiCKET_STATE.WORKINPROGRESS },
  { label: 'CLOSED', value: TiCKET_STATE.CLOSED },
  { label: 'CANCEL', value: TiCKET_STATE.CANCEL }
];

  expandIndex: number | null = null; // Expand row index, if needed
  alarmes: any[] = [];
  sites: any[] = [];
  alarm: any = [];
  formGroup!: FormGroup;
  motCle: String = "";
  Currentpage: number = 1;
  size: number = 10;
  pages: any;
  filterAlarme: String = "";
  occurence:any;
  date: Date | null = null;
  siteId: string | null = null;
  alarmName: string | null = null;
  filterParams: any = {
    siteId: null,
    alarmName: null,
    date: null
  };
  loading: boolean = false;
  status:any = null;
  selectedStatus: any;


  
  constructor(public authservice: LoginService,
    private alarmeService: AlarmesService, private fb: FormBuilder,
    private route: ActivatedRoute, private message: NzMessageService, private siteService: SiteService) { 
      this.formGroup = this.fb.group({
        siteFilter: ['Sites'] // Default selected value
      });
  
      // Subscribe to value changes
      this.formGroup!.get('siteFilter')!.valueChanges.subscribe(value => {
        console.log('Selected site filter:', value);
        // Perform additional actions based on the value change
      });
    }


  ngOnInit(): void {
   this.route.queryParams.subscribe((param) => {
    if(param && param['status'] !== null &&param['status'] !== undefined ){
      this.status = param['status'];
      this.alarmeService.getAlarmsByStatus(this.status)
      .subscribe(
        res => {
        this.alarmes= res?.data;
        },
        error => {}
      )
    } else{
    this.getAlarmes();

    }
    
   })
    

  }
  public getAlarmes() {
    this.loading = true;
    this.alarmeService.getAlarmes(this.Currentpage, this.size).subscribe(
      (response: any) => {
        this.alarmes =  response.data;
        this.loading = false;
        this.message.success('Alarms loaded successfuly !')
      },
    error => {
      this.message.error(error.error.message);
      this.loading = false;
    })

  }

  public getSitess() {
    this.siteService.getSites().subscribe(
      (response: any) => {
        this.sites =  response.data;
      })

  }
  getColor(index: number): string {
    return index % 2 === 0 ? 'white' : 'rgba(7, 102, 190, 0.04)'; // Changez les couleurs selon vos préférences
  }
  handleSearchAlarme() {

    /*  let kw = this.formGroup?.value.keyword;
    this.alarmeService.rechercheAlarmes(kw).subscribe(
      data=>{
        this.alarmes=data;
        console.log(this.alarmes.content) 
    })
      */
  }
  
  gotoPage(i: number) {
    this.Currentpage = i;
    this.getAlarmes()
  }

 

  onSiteSearch(target: any): void {
    if(target?.value !== null && target?.value !== ''){
      this.filterParams.siteId = target?.value;
    }
  }

  onAlarmSearch(target: any): void {
    if(target?.value !== null && target?.value !== ''){
      this.filterParams.alarmName = target.value;

    }
   

   // this.filteredAlarms = this.alarms.filter(alarm => alarm.name.toLowerCase().includes(value.toLowerCase()));
  }
 
  onDateSearch(date: any) {
   if(date !== null){
    this.filterParams.date =formatDate(date);
   }
    }
 
  applayFilter() {
    console.log(this.filterParams)
      this.alarmeService.filter(this.filterParams)
      .subscribe(
        res => {
          this.message.success('filtered sucessfuly !');
          this.alarmes = res.data;
          
         },
        error => this.message.error(error?.error?.message)
      )
      
    }

    reloadData(){
      this.filterParams.siteId = null;
      this.filterParams.alarmName = null;
      this.filterParams.date = null;
      this.filterParams.status = null;
      this.date = null;
      this.alarmName = null;
      this.siteId = null;
      this.selectedStatus = null;
      this.getAlarmes();
    }

    onStatusSearch(value: any) {
      console.log(value);
      
      this.filterParams.status = value;
  
      this.applayFilter();
      
      }
  
}
