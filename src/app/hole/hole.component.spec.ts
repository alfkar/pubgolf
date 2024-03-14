import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoleComponent } from './hole.component';

describe('HoleComponent', () => {
  let component: HoleComponent;
  let fixture: ComponentFixture<HoleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HoleComponent]
    });
    fixture = TestBed.createComponent(HoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
