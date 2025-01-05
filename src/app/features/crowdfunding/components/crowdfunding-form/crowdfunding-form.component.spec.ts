import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrowdfundingFormComponent } from './crowdfunding-form.component';

describe('CrowdfundingFormComponent', () => {
  let component: CrowdfundingFormComponent;
  let fixture: ComponentFixture<CrowdfundingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrowdfundingFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrowdfundingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
