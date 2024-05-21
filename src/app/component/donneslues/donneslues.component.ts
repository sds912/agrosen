import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../service/login.service';
import { Router } from '@angular/router';
import { AlarmesService } from '../../service/alarmes.service';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-donneslues',
  templateUrl: './donneslues.component.html',
  styleUrl: './donneslues.component.css'
})
export class DonnesluesComponent {
  alarmes:any;
  formGroup!:FormGroup;
  motCle:String="";
  Currentpage:number=0;
  size:number=10;
  pages:any;
  filterAlarme:String="";
constructor(public authservice:LoginService, 
 private alarmeService:AlarmesService,private fb: FormBuilder,
 private router:Router){}

ngOnInit(): void {
 this.getAlarmes();
 this.formGroup=this.fb.group({
   keyword:this.fb.control("")
 });
}
 public getAlarmes(){
    this.alarmeService.getData(this.motCle,this.Currentpage,this.size).subscribe(
     data=>{  this.alarmes=data;
              this.pages=new Array(this.alarmes.totalPages)
       //console.log(this.alarmes)
     })
     
 }
 getColor(index: number): string {
   return index % 2 === 0 ? 'white' : 'rgba(7, 102, 190, 0.04)'; // Changez les couleurs selon vos préférences
 }
  handleSearchAlarme(){
  
   /*  let kw = this.formGroup?.value.keyword;
   this.alarmeService.rechercheAlarmes(kw).subscribe(
     data=>{
       this.alarmes=data;
       console.log(this.alarmes.content) 
   })
     */
 }
 gotoPage(i:number){
  this.Currentpage=i;
  this.getAlarmes()
 }
 

}
