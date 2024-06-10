// src/app/site-list/site-list.component.ts
import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SiteService } from '../../service/site.service';

@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.css']
})
export class SiteListComponent implements OnInit {
  sites: any[] = [];

  constructor(private siteService: SiteService, private message: NzMessageService) {}

  ngOnInit(): void {
    this.loadSites();
  }

  loadSites(): void {
    this.siteService.getSites().subscribe(
      (response: any) => {
        this.sites = response?.data?.map((site: any) => ({
          KiSite: site.siteId,
          Cluster: site.siteClass,
          SiteName: site.siteName,
          SiteType: site.siteType,
          GE: site.users.filter((user: any) => user.role === 'GE').map((user: any) => user.firstName + ' ' + user.lastName),
          FS: site.users.filter((user: any) => user.role === 'FS').map((user: any) => user.firstName + ' ' + user.lastName),
          FE: site.users.filter((user: any) => user.role === 'FE').map((user: any) => user.firstName + ' ' + user.lastName)
        }));
        console.log(this.sites);
        
      },
      error => {
        this.message.error('Failed to load sites.');
        console.log(error);
        
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
}
