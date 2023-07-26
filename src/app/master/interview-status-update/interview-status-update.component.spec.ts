import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewStatusUpdateComponent } from './interview-status-update.component';

describe('InterviewStatusUpdateComponent', () => {
  let component: InterviewStatusUpdateComponent;
  let fixture: ComponentFixture<InterviewStatusUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterviewStatusUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterviewStatusUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
