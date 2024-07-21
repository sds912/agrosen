import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmTicketPmFormComponent } from './alarm-ticket-pm-form.component';

describe('AlarmTicketPmFormComponent', () => {
  let component: AlarmTicketPmFormComponent;
  let fixture: ComponentFixture<AlarmTicketPmFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlarmTicketPmFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlarmTicketPmFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
