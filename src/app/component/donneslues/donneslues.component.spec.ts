import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonnesluesComponent } from './donneslues.component';

describe('DonnesluesComponent', () => {
  let component: DonnesluesComponent;
  let fixture: ComponentFixture<DonnesluesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DonnesluesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DonnesluesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
