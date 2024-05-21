import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmesComponent } from './alarmes.component';

describe('AlarmesComponent', () => {
  let component: AlarmesComponent;
  let fixture: ComponentFixture<AlarmesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlarmesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlarmesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
