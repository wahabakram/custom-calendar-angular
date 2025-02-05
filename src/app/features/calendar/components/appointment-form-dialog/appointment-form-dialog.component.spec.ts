import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentFormDialogComponent } from './appointment-form-dialog.component';

describe('AppointmentFormDialogComponent', () => {
  let component: AppointmentFormDialogComponent;
  let fixture: ComponentFixture<AppointmentFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentFormDialogComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AppointmentFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
