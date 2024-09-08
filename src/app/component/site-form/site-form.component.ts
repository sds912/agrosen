// src/app/site-form/site-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SiteService } from '../../service/site.service';
import { ClusterService } from '../../service/cluster.service';
import { UserGroupService } from '../../service/user-group.service';
import { UserService } from '../../service/user.service';
import { ROLE } from '../../shared/app-constants';

@Component({
  selector: 'app-site-form',
  templateUrl: './site-form.component.html',
  styleUrls: ['./site-form.component.css']
})
export class SiteFormComponent implements OnInit {
  siteForm: FormGroup;
  isEditing = false;
  isLoading = false;
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
  userGroups: any[] = [];
  // Arrays for dropdown options
  maintenancePartners: string[] = ['Partner A', 'Partner B', 'Partner C'];
  transitionMaintenancePartners: string[] = ['Partner D', 'Partner E', 'Partner F'];
  fuelTransporters: string[] = ['Transporter A', 'Transporter B', 'Transporter C'];
  transitionFuelTransporters: string[] = ['Transporter D', 'Transporter E', 'Transporter F'];
  securityPartners: string[] = ['Security A', 'Security B', 'Security C'];
  transitionSecurityPartners: string[] = ['Security D', 'Security E', 'Security F'];
  groundLeaseStatuses: string[] = ['--Non--','Active', 'Pending', 'Expired', 'Terminated'];
  structureTypes: string[] = [];
  siteStatus: string[] = ['Active', 'Pending', 'Expired', 'Terminated'];
  zms: any[] = [];

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
      customerId: [''],
      address: this.fb.group({
        city: [''],
        region: [''],
        country: [''],
        street: [''],
        lat: [0],
        lng: [0]
      }),
      clusterNumber: [0, Validators.required],
      fe: [[], Validators.required],
      fs: [[], Validators.required],
      userGroup: [''],
      ge: [''],
      battery: [''],
      solar: [''],
      zm: [''],  
      partnerMaintenance: [''],  
      transitionPartnerMaintenance: [''],  
      securityPartner: [''],
      transitionSecurityPartner: [''],
      securityPartnerRepresentative: [''],
      structureType: [''],  
      structureHeight: [''],
      hybrid: [''],
      availableForLocation: [''],  
      status: [''],  
      fuelTransporter: [''],
      transitionFuelTransporter: [''],
      financialSiteId: [''],  
      rfiDate: [''],
      onAirDate: [''],
      landlorName: [''],   
      groundLeaseStatus: [''],
      populationDensity: [''],
      district: [''],
      zone: [''],
      regionalHead: [''],
      zonalHead: [''],
      fieldSupervisor: [''],
      mpFieldEngineer: [''],
      fpFieldEngineer: [''],
      nocManagernotification: ['']  
    });
    
    
    
  }

  ngOnInit(): void {
    this.loadClusters();
    this.loadUserByRole(ROLE.FE);
    this.loadUserByRole(ROLE.FS);
    this.loadUserByRole(ROLE.ZM);
    this.loadUserGroup();
    //this.siteId = this.route.snapshot.paramMap.get('id')!;
    
    this.route.queryParams.subscribe((param) => {
      this.siteId = param['id'];
      if (this.siteId) {
        this.isEditing = true;
        this.loadSite(this.siteId);
      }
    })
    
   
  }

  userByRole (role: string , data: any): any  {
   return data.users.filter((user: any )=> user.role === role).map((user: any) => user.id)
  }

  loadSite(id: string): void {
    this.siteService.getSiteById(id).subscribe(
      
      data => {
      console.log(data);

        this.siteForm.patchValue({
          siteName: data.siteName,
          siteClass: data.siteClass,
          siteId: data.siteId,
          siteType: data.siteType,
          genset: data.genset,
          customerId: data.customerId,
          address: {
            city: data.address.city,
            region: data.address.region,
            country: data.address.country,
            street: data.address.street,
            lat: data.address.lat,
            lng: data.address.lng,
          },
          clusterNumber: data.cluster.clusterNumber,
          fe: this.userByRole(ROLE.FE, data),
          fs: this.userByRole(ROLE.FS, data),
          userGroup:  data.userGroups[0].id,
          ge: data.ge,
          battery: data.battery,
          solar: data.solar,
          zm: data.zm,
          partnerMaintenance: data.partnerMaintenance,
          transitionPartnerMaintenance: data.transitionPartnerMaintenance,
          securityPartner: data.securityPartner,
          transitionSecurityPartner: data.transitionSecurityPartner,
          securityPartnerRepresentative: data.securityPartnerRepresentative,
          structureType: data.structureType,
          structureHeight: data.structureHeight,
          hybrid: data.hybrid,
          availableForLocation: data.availableForLocation,
          status: data.status,
          fuelTransporter: data.fuelTransporter,
          transitionFuelTransporter: data.transitionFuelTransporter,
          financialSiteId: data.financialSiteId,
          rfiDate: data.rfiDate,
          onAirDate: data.onAirDate,
          landlorName: data.landlorName,
          groundLeaseStatus: data.groundLeaseStatus,
          populationDensity: data.populationDensity,
          district: data.district,
          zone: data.zone,
          regionalHead: data.regionalHead,
          zonalHead: data.zonalHead,
          fieldSupervisor: data.fieldSupervisor,
          mpFieldEngineer: data.mpFieldEngineer,
          fpFieldEngineer: data.fpFieldEngineer,
          nocManagernotification: data.nocManagernotification
        });
        
      },
      error => {
        this.message.error('Failed to load site.');
      }
    );
  }

  loadClusters(): void {
    this.isLoading = true;
    this.clusterService.getClusters().subscribe(
      (response: any) => {
        this.clusters = response?.data;
        this.isLoading = false;
      },
      error => {
        this.message.error('Failed to load site.');
        this.isLoading = false;

      }
    );
  }

 

  loadUserGroup(): void {
    this.userService.getUserGroups().subscribe(
      (response: any) => {
       // console.log(response)
        this.userGroups = response?.data;
      },
      error => {
        this.message.error('Failed to load site.');
      }
    );
  }


  

  loadUserByRole(role: string ): void {
    this.userService.getUsersByRole(role).subscribe(
      (response: any) => {
       if(role === ROLE.FS){
        this.fss = response?.data;
       }
       if(role === ROLE.FE){
        this.fes = response?.data;
       }
       if(role === ROLE.ZM){
        this.zms = response?.data;

       }
      },
      error => {
        this.message.error('Failed to load site.');
      }
    );
  }


  saveSite(): void {
    const site: any = this.siteForm.value;

    // Prepare data for submission
    const updatedSite = {
        ...site,
        id: this.siteId, // Ensure the ID is included for updates
        users: [
            ...site.fe.map((feId: any) => ({ id: feId, role: 'FE' })),
            ...site.fs.map((fsId: any) => ({ id: fsId, role: 'FS' }))
        ],
        cluster: { clusterNumber: site.clusterNumber }
    };

    console.log(updatedSite);
    

    if (this.isEditing) {
        this.siteService.updateSite(this.siteId, updatedSite).subscribe(
            () => {
                this.message.success('Site updated successfully.');
                this.router.navigate(['admin/sites'], { queryParams: { type: 'list' } });
            },
            error => {
                this.message.error(error.error?.message[0] ?? 'Unknown error');
                console.log(error);
            }
        );
    } else {
        this.siteService.createSite(updatedSite).subscribe(
            () => {
                this.message.success('Site created successfully.');
                this.router.navigate(['admin/sites'], { queryParams: { type: 'list' } });
            },
            error => {
                this.message.error(error.error?.message[0] ?? 'Unknown error');
                console.log(error);
            }
        );
    }
}

    
}
