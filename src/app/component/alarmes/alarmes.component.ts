import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../service/login.service';
import { Router } from '@angular/router';
import { AlarmesService } from '../../service/alarmes.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';



@Component({
  selector: 'app-alarmes',
  templateUrl: './alarmes.component.html',
  styleUrl: './alarmes.component.css'
})
export class AlarmesComponent implements OnInit {
  expandIndex: number | null = null; // Expand row index, if needed
  alarmes: any[] = [];
  alarm: any = [];
  formGroup!: FormGroup;
  motCle: String = "";
  Currentpage: number = 1;
  size: number = 10;
  pages: any;
  filterAlarme: String = "";
 occurence:any;


  
  constructor(public authservice: LoginService,
    private alarmeService: AlarmesService, private fb: FormBuilder,
    private router: Router) { 
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

  viewDetails(id: any){

  }

  edit(id: any){

  }
  delete(id: any){

  }

 

  listOfData: any[] = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park'
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park'
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park'
    }
  ];
 
  
  
}
