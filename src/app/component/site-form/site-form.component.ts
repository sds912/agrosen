// src/app/site-form/site-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SiteService } from '../../service/site.service';

@Component({
  selector: 'app-site-form',
  templateUrl: './site-form.component.html',
  styleUrls: ['./site-form.component.css']
})
export class SiteFormComponent implements OnInit {
  siteForm: FormGroup;
  isEditing = false;
  siteId!: string;

  clusters = ['Cluster1', 'Cluster2', 'Cluster3']; // Replace with actual cluster data
  siteTypes = ['Type1', 'Type2', 'Type3']; // Replace with actual site type data
  options = ['Option1', 'Option2', 'Option3']; // Replace with actual GE/FS/FE options

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private siteService: SiteService,
    private message: NzMessageService
  ) {
    this.siteForm = this.fb.group({
      KiSite: ['', Validators.required],
      Cluster: ['', Validators.required],
      SiteName: ['', Validators.required],
      SiteType: ['', Validators.required],
      GE: [[], Validators.required],
      FS: [[], Validators.required],
      FE: [[], Validators.required]
    });
  }

  ngOnInit(): void {
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

  saveSite(): void {
    if (this.siteForm.valid) {
      const site: any = this.siteForm.value;
      if (this.isEditing) {
        this.siteService.updateSite(this.siteId, site).subscribe(
          () => {
            this.message.success('Site updated successfully.');
            this.router.navigate(['/sites']);
          },
          error => {
            this.message.error('Failed to update site.');
          }
        );
      } else {
        this.siteService.createSite(site).subscribe(
          () => {
            this.message.success('Site created successfully.');
            this.router.navigate(['/sites']);
          },
          error => {
            this.message.error('Failed to create site.');
          }
        );
      }
    } else {
      this.message.error('Please fill out the form correctly.');
    }
  }
}
