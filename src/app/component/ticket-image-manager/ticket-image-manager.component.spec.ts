import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketImageManagerComponent } from './ticket-image-manager.component';

describe('TicketImageManagerComponent', () => {
  let component: TicketImageManagerComponent;
  let fixture: ComponentFixture<TicketImageManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TicketImageManagerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TicketImageManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
