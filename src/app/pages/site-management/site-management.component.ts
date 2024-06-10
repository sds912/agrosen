import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-site-management',
  templateUrl: './site-management.component.html',
  styleUrl: './site-management.component.css'
})
export class SiteManagementComponent implements OnInit {

  display: string = 'list';

  constructor(private route: ActivatedRoute){

  }


  ngOnInit(): void {
    this.route.queryParamMap.subscribe(param => {
      const type = param.get('type');
      if(type !== undefined && type !== '' && type !== null){
         this.display = type;
      }
    })
  }

}
