import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainBottomNavBarComponent } from './main-bottom-nav-bar.component';

describe('MainBottomNavBarComponent', () => {
  let component: MainBottomNavBarComponent;
  let fixture: ComponentFixture<MainBottomNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainBottomNavBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainBottomNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
