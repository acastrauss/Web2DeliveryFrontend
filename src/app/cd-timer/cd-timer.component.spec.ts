import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdTimerComponent } from './cd-timer.component';

describe('CdTimerComponent', () => {
  let component: CdTimerComponent;
  let fixture: ComponentFixture<CdTimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CdTimerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CdTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
