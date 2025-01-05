import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPostListComponent } from './main-post-list.component';

describe('MainPostListComponent', () => {
  let component: MainPostListComponent;
  let fixture: ComponentFixture<MainPostListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainPostListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainPostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
