import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketTaskListComponent } from './ticket-task-list.component';

describe('TicketTaskListComponent', () => {
  let component: TicketTaskListComponent;
  let fixture: ComponentFixture<TicketTaskListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TicketTaskListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TicketTaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
