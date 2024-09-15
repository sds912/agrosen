import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmTicketPmPmaFormComponent } from './alarm-ticket-pm-pma-form.component';

describe('AlarmTicketPmPmaFormComponent', () => {
  let component: AlarmTicketPmPmaFormComponent;
  let fixture: ComponentFixture<AlarmTicketPmPmaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlarmTicketPmPmaFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlarmTicketPmPmaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
