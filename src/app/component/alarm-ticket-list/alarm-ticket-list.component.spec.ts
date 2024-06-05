import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmTicketListComponent } from './alarm-ticket-list.component';

describe('AlarmTicketListComponent', () => {
  let component: AlarmTicketListComponent;
  let fixture: ComponentFixture<AlarmTicketListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlarmTicketListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlarmTicketListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
