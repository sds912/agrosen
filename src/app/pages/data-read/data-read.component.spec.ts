import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataReadComponent } from './data-read.component';

describe('DataReadComponent', () => {
  let component: DataReadComponent;
  let fixture: ComponentFixture<DataReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataReadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
