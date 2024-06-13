import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmTicketPMOpenFormComponent } from './alarm-ticket-pm-open-form.component';

describe('AlarmTicketPMOpenFormComponent', () => {
  let component: AlarmTicketPMOpenFormComponent;
  let fixture: ComponentFixture<AlarmTicketPMOpenFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlarmTicketPMOpenFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlarmTicketPMOpenFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
