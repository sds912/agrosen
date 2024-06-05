import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmOpenFormComponent } from './alarm-ticket-open-form.component';

describe('AlarmOpenFormComponent', () => {
  let component: AlarmOpenFormComponent;
  let fixture: ComponentFixture<AlarmOpenFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlarmOpenFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlarmOpenFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
