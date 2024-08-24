import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SiteService } from '../../service/site.service';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { NzModalService } from 'ng-zorro-antd/modal';
import { SiteDetailsComponent } from '../site-details/site-details.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.css']
})
export class SiteListComponent implements OnInit {
  sites: any[] = [];
  siteTypes: string[] = ['TOP','BOTTOM'];
  loading: boolean = true;
  total: number = 0;
  pageSize = 10;
  pageIndex = 1;
  siteName: string | null = null;
  siteId: string | null = null;
  selectedCluster: any = null;
  clusters: any[] = [];
  fliterParams = {
    siteId: null,
    cluster: null,
    siteName: null
  }



  constructor(private siteService: SiteService,
     private message: NzMessageService, 
     private modal: NzModalService) {}

  ngOnInit(): void {
    this.loadSites();
    this.loadClusters();
  }

  loadSites(limit: number = 10, pageIndex: number = 1): void {
    this.loading = true;
    this.siteService.getSites(limit, pageIndex).subscribe(
      (response: any) => {
        this.total = response?.count;
        this.sites = response?.data?.map((site: any) => ({
          siteId: site.siteId ?? 'N/A',
          id: site.id,
          cluster: site.cluster?.clusterNumber ?? 'N/A',
          siteName: site.siteName ?? 'N/A',
          siteType: site.siteType ? this.siteTypes[site.siteType] ?? 'N/A' : 'N/A',
          customerId: site.customerId ?? 'N/A',
          genset: site.genset ?? 'N/A',
          battery: site.battery ?? 'N/A',
          solar: site.solar ?? 'N/A',
          location: {
            city: site.address.city ?? 'N/A',
            country: site.address.country ?? 'N/A',
            region: site.address.region ?? 'N/A'
          },
          GE: site.ge ?? 'N/A',
          FS: site.users.filter((user: any) => user.role === 'FS').map((user: any) => user.firstName + ' ' + user.lastName),
          FE: site.users.filter((user: any) => user.role === 'FE').map((user: any) => user.firstName + ' ' + user.lastName)
        }));
        this.loading = false;
      },
      error => {
        this.message.error('Failed to load sites.');
        console.log(error);
        this.loading = false;
      }
    );
  }

  loadClusters(): void{
  this.siteService.getCulsters().
  subscribe(
    (res: any) => {
     this.clusters = res?.data
    }
    ,error => {
      console.log(error);
      this.message.error('Loading Data Failled !')
    }
  )
  }
  deleteSite(id: string): void {
    this.siteService.deleteSite(id).subscribe(
      () => {
        this.message.success('Site deleted successfully.');
        this.loadSites();
      },
      error => {
        this.message.error('Failed to delete site.');
      }
    );
  }

  editSite(id: string): void {
    this.siteService.deleteSite(id).subscribe(
      () => {
        this.message.success('Site deleted successfully.');
        this.loadSites();
      },
      error => {
        this.message.error('Failed to delete site.');
      }
    );
  }

  showEditSite(site:any){

  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    console.log(params);
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    this.pageIndex = pageIndex;
    this.loadSites(pageSize, pageIndex)
  }

  viewSiteDetails(siteId: string): void {
    const site = this.sites.filter((site: any) => site.id === siteId)[0];
    this.modal.create({
      nzTitle: 'Site Details',
      nzContent: SiteDetailsComponent,
      nzData: {site},
      nzFooter: null,
      nzWidth: 800
    });
  }

  // search site by siteId
  onSiteIdSearch($target: any) {
    this.fliterParams.siteId = $target.value;
 
  }
  applayFilter() {
    this.siteService.filter(this.fliterParams)
    .subscribe(
      (res:any) => {
        this.sites = res?.data;
      },
      error => {
        console.log(error);
        this.message.error('Loading Data failled')
      }
    )
    
  }
  reloadData() {
   this.resetFilter();
   this.loadSites();
  }
  onSiteNameSearch($event: any) {
    this.fliterParams.siteName = $event.value;
  }

  onClusterSearch($event: any){
    this.fliterParams.cluster = $event;

  }

  resetFilter(){
    this.siteName = null;
    this.siteId = null;
    this.selectedCluster = null;
    this.fliterParams.cluster = null;
    this.fliterParams.siteId = null;
    this.fliterParams.siteName = null;
  }
}
