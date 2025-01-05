import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrowdfundingListComponent } from './crowdfunding-list.component';

describe('CrowdfundingListComponent', () => {
  let component: CrowdfundingListComponent;
  let fixture: ComponentFixture<CrowdfundingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrowdfundingListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrowdfundingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
