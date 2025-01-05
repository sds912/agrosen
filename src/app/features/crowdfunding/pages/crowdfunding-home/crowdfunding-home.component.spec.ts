import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrowdfundingHomeComponent } from './crowdfunding-home.component';

describe('CrowdfundingHomeComponent', () => {
  let component: CrowdfundingHomeComponent;
  let fixture: ComponentFixture<CrowdfundingHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrowdfundingHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrowdfundingHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
