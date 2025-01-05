import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrowdfundingDetailsComponent } from './crowdfunding-details.component';

describe('CrowdfundingDetailsComponent', () => {
  let component: CrowdfundingDetailsComponent;
  let fixture: ComponentFixture<CrowdfundingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrowdfundingDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrowdfundingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
