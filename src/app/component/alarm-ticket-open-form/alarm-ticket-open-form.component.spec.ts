import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmTicketOpenFormComponent } from './alarm-ticket-open-form.component';

describe('AlarmTicketOpenFormComponent', () => {
  let component: AlarmTicketOpenFormComponent;
  let fixture: ComponentFixture<AlarmTicketOpenFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlarmTicketOpenFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlarmTicketOpenFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
