import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-last-data-detail',
  templateUrl: './last-data-detail.component.html',
  styleUrls: ['./last-data-detail.component.css']
})
export class LastDataDetailComponent implements OnInit {
  lastDataDetailForm!: FormGroup;
  //loading: boolean = true;
  site: any;

    
    constructor(private fb: FormBuilder,private modalRef: NzModalRef ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.site = this.modalRef.getConfig()?.nzData?.site;
    this.lastDataDetailForm.patchValue(this.site);
    this.lastDataDetailForm.disable();
   
  }

  initializeForm(): void {
    this.lastDataDetailForm = this.fb.group({
      siteId: [{ value: '', disabled: true }],
      siteName: [''],
      latitude: [null],
      longitude: [null],
      fuel: [null],
      freq: [null],
      idc1: [null],
      idc2: [null],
      igl1: [null],
      igl2: [null],
      igl3: [null],
      iL1: [null],
      iL2: [null],
      iL3: [null],
      udc1: [null],
      udc2: [null],
      uL1: [null],
      uL2: [null],
      uL3: [null],
      port: [null],
      temp: [null]
    });
  }

  
}
