import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketTaskManagementComponent } from './ticket-task-management.component';

describe('TicketTaskManagementComponent', () => {
  let component: TicketTaskManagementComponent;
  let fixture: ComponentFixture<TicketTaskManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TicketTaskManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TicketTaskManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
