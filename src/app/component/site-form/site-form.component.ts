// src/app/site-form/site-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SiteService } from '../../service/site.service';
import { ClusterService } from '../../service/cluster.service';
import { UserGroupService } from '../../service/user-group.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-site-form',
  templateUrl: './site-form.component.html',
  styleUrls: ['./site-form.component.css']
})
export class SiteFormComponent implements OnInit {
  siteForm: FormGroup;
  isEditing = false;
  siteId!: string;
  clusters: any[] = [];
  fss: any[] = [];
  fes: any[] = [];
  ges: string[] = ["Generator Logic", "SDMO", "TECNOGEN", "UNATRAC", "ELCOS", "PRAMAC", "Caterpillar"];
  classes: string[] = ["Gold", "Platinum", "Silver"];
  siteTypes: any[] = [
    {
      key: "1",
      name: "TOP"
    },
    {
      key: "2",
      name: "BOTTOM"
    }
  ]
  batteries: string[] = ['ALESIS', 'NUX', 'EFNOTE'];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private siteService: SiteService,
    private message: NzMessageService,
    private clusterService: ClusterService,
    private userGroupService: UserGroupService,
    private userService: UserService
  ) {
    this.siteForm = this.fb.group({
      siteName: ['', Validators.required],
      siteClass: ['', Validators.required],
      siteType: ['', Validators.required],
      siteId: ['', Validators.required],
      genset: [0],
      ge: [''],
      customerId: '',
      address: this.fb.group({
        city: [''],
        region: [''],
        country: [''],
        street: [''],
        lat: [0, ],
        lng: [0, ]
      }),
      clusterNumber: ['', Validators.required],
      fe: [[], Validators.required],
      fs: [[], Validators.required],
     // userGroup: ['']
      battery: ['']
    });
    
  }

  ngOnInit(): void {
    this.loadClusters();
    this.loadFE();
    this.loadFS();
    this.siteId = this.route.snapshot.paramMap.get('id')!;
    if (this.siteId) {
      this.isEditing = true;
      this.loadSite(this.siteId);
    }
  }

  loadSite(id: string): void {
    this.siteService.getSiteById(id).subscribe(
      data => {
        this.siteForm.patchValue(data);
      },
      error => {
        this.message.error('Failed to load site.');
      }
    );
  }

  loadClusters(): void {
    this.clusterService.getClusters().subscribe(
      (response: any) => {
        this.clusters = response?.data;
        console.log(response.data)
      },
      error => {
        this.message.error('Failed to load site.');
      }
    );
  }

  loadFE(): void {
    this.userService.getUsersByRole('FE').subscribe(
      (response: any) => {
        console.log(response)
        this.fes = response?.data;
      },
      error => {
        this.message.error('Failed to load site.');
      }
    );
  }

  loadFS(): void {
    this.userService.getUsersByRole('FS').subscribe(
      (response: any) => {
        console.log(response)
        this.fss = response?.data;
      },
      error => {
        this.message.error('Failed to load site.');
      }
    );
  }


  saveSite(): void {
    const site: any = this.siteForm.value;

    console.log(site)

   
        this.siteService.createSite(site).subscribe(
          () => {
            this.message.success('Site created successfully.');
            this.router.navigate(['admin/sites'] ,{queryParams:{type:'list'}});
          },
          error => {
            this.message.error(error.error!.message[0]??'Unknown error');
            console.log(error)
          }
        );
      }
    
}
