import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmTicketSwoFormComponent } from './alarm-ticket-swo-form.component';

describe('AlarmTicketSwoFormComponent', () => {
  let component: AlarmTicketSwoFormComponent;
  let fixture: ComponentFixture<AlarmTicketSwoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlarmTicketSwoFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlarmTicketSwoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
