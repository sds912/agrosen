import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../service/login.service';
import { Router } from '@angular/router';
import { AlarmesService } from '../../service/alarmes.service';
import { FormBuilder, FormGroup } from '@angular/forms';



@Component({
  selector: 'app-alarmes',
  templateUrl: './alarmes.component.html',
  styleUrl: './alarmes.component.css'
})
export class AlarmesComponent implements OnInit {
  alarmes: any;
  alarm: any = [];
  formGroup!: FormGroup;
  motCle: String = "";
  Currentpage: number = 0;
  size: number = 10;
  pages: any;
  filterAlarme: String = "";
 occurence:any;
  
  constructor(public authservice: LoginService,
    private alarmeService: AlarmesService, private fb: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
      //this.getOccurence()
    this.getAlarmes();
    this.formGroup = this.fb.group({
      keyword: this.fb.control("")
    });

  }
  public getAlarmes() {
    this.alarmeService.getAlarmes(this.motCle, this.Currentpage, this.size).subscribe(
      data => {
        this.alarmes = data;
        this.pages = new Array(this.alarmes.totalPages)
        this.alarm = this.alarmes.content
        //console.log(this.alarm)
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

 
  
  
}
