import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreJobSafetyChecklistComponent } from './pre-job-safety-checklist.component';

describe('PreJobSafetyChecklistComponent', () => {
  let component: PreJobSafetyChecklistComponent;
  let fixture: ComponentFixture<PreJobSafetyChecklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PreJobSafetyChecklistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreJobSafetyChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
