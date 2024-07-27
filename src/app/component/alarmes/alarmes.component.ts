import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../service/login.service';
import { Router } from '@angular/router';
import { AlarmesService } from '../../service/alarmes.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SiteService } from '../../service/site.service';
import { formatDate } from '../../shared/date-formater';



@Component({
  selector: 'app-alarmes',
  templateUrl: './alarmes.component.html',
  styleUrl: './alarmes.component.css'
})
export class AlarmesComponent implements OnInit {


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
  filterParams: any = {
    siteName: null,
    alarmName: null,
    date: null
  };


  
  constructor(public authservice: LoginService,
    private alarmeService: AlarmesService, private fb: FormBuilder,
    private router: Router, private message: NzMessageService, private siteService: SiteService) { 
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
      //this.getOccurence()
    this.getAlarmes();
    this.getSitess();
    this.formGroup = this.fb.group({
      keyword: this.fb.control("")
    });

  }
  public getAlarmes() {
    this.alarmeService.getAlarmes(this.Currentpage, this.size).subscribe(
      (response: any) => {
        console.log(response.data)
        this.alarmes =  response.data;
      //  this.pages = new Array(this.alarmes.totalPages)
     //   this.alarm = this.alarmes.data;
      //  console.log(this.alarm)
      })

  }

  public getSitess() {
    this.siteService.getSites().subscribe(
      (response: any) => {
        console.log(response.data)
        this.sites =  response.data;
      //  this.pages = new Array(this.alarmes.totalPages)
     //   this.alarm = this.alarmes.data;
      //  console.log(this.alarm)
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
   this.filterParams.siteName = target?.value;
   // this.filteredSites = this.sites.filter(site => site.name.toLowerCase().includes(value.toLowerCase()));
  }

  onAlarmSearch(target: any): void {
    this.filterParams.alarmName = target.value;
   

   // this.filteredAlarms = this.alarms.filter(alarm => alarm.name.toLowerCase().includes(value.toLowerCase()));
  }
 
  onDateSearch(date: any) {

    this.filterParams.date =formatDate(date);

    
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
  
}
