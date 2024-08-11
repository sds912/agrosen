import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastDataDetailComponent } from './last-data-detail.component';

describe('LastDataDetailComponent', () => {
  let component: LastDataDetailComponent;
  let fixture: ComponentFixture<LastDataDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LastDataDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LastDataDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
