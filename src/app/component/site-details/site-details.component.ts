import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SiteService } from '../../service/site.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-site-details',
  templateUrl: './site-details.component.html',
  styleUrl: './site-details.component.css'
})
export class SiteDetailsComponent {
  siteForm: FormGroup;
  loading: boolean = false;
  site: any;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private siteService: SiteService,
    private router: Router,
    private modalRef: NzModalRef
  ) {
    this.site = this.modalRef.getConfig()?.nzData?.site;
    this.siteForm = this.fb.group({
      siteId: [{ value: '', disabled: true }],
      customerId: [{ value: '', disabled: true }],
      siteName: [{ value: '', disabled: true }],
      siteClass: [{ value: '', disabled: true }],
      siteType: [{ value: '', disabled: true }],
      clusterNumber: [{ value: '', disabled: true }],
      userGroup: [{ value: '', disabled: true }],
      battery: [{ value: '', disabled: true }],
      ge: [{ value: '', disabled: true }],
      fs: [{ value: '', disabled: true }],
      fe: [{ value: '', disabled: true }],
      address: this.fb.group({
        country: [{ value: '', disabled: true }],
        region: [{ value: '', disabled: true }],
        city: [{ value: '', disabled: true }],
        street: [{ value: '', disabled: true }],
        lat: [{ value: '', disabled: true }],
        lng: [{ value: '', disabled: true }]
      })
    });
  }

  ngOnInit(): void {

    if(this.site){
      this.getSiteDetails(this.site?.id);
    }
    
   
  }

  getSiteDetails(siteId: string): void {
    this.loading = true;
    this.siteService.getSiteById(siteId).subscribe(site => {
      this.siteForm.patchValue(site);
      this.loading = false;
    });
  }

  goBack(): void {
    this.router.navigate(['/admin/sites'])
  }

}
