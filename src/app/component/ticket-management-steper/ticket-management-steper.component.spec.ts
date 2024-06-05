import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketManagementSteperComponent } from './ticket-management-steper.component';

describe('TicketManagementSteperComponent', () => {
  let component: TicketManagementSteperComponent;
  let fixture: ComponentFixture<TicketManagementSteperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TicketManagementSteperComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TicketManagementSteperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
