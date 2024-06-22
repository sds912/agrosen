import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketTaskFormComponent } from './ticket-task-form.component';

describe('TicketTaskFormComponent', () => {
  let component: TicketTaskFormComponent;
  let fixture: ComponentFixture<TicketTaskFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TicketTaskFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TicketTaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
