import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SiteService } from '../../service/site.service';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Router } from '@angular/router';

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

  constructor(private siteService: SiteService, private message: NzMessageService, private router: Router) {}

  ngOnInit(): void {
    this.loadSites();
  }

  loadSites(): void {
    this.loading = true;
    this.siteService.getSites().subscribe(
      (response: any) => {
        console.log(response);
        
        this.sites = response?.data?.map((site: any) => ({
          siteId: site.siteId ?? 'N/A',
          id: site.id,
          cluster: site.cluster?.clusterNumber ?? 'N/A',
          siteName: site.siteName ?? 'N/A',
          siteType: site.siteType ? this.siteTypes[site.siteType] ?? 'N/A' : 'N/A',
          customerId: site.customerId ?? 'N/A',
          genset: site.genset ?? 'N/A',
          battery: site.battery ?? 'N/A',
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

  onQueryParamsChange(params: NzTableQueryParams): void {
    console.log(params);
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    this.loadSites()
   // this.loadDataFromServer(pageIndex, pageSize, sortField, sortOrder, filter);
  }

  viewSiteDetails(siteId: string): void {
    this.router.navigate(['/admin/sites', siteId]);
  }
}
