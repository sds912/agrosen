import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmTicketManagementComponent } from './alarm-ticket-management.component';

describe('AlarmTicketManagementComponent', () => {
  let component: AlarmTicketManagementComponent;
  let fixture: ComponentFixture<AlarmTicketManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlarmTicketManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlarmTicketManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
