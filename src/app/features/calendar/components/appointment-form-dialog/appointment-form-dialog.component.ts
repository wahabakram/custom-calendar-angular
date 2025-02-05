import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogContent, MatDialogActions, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';

@Component({
  selector: 'app-appointment-form-dialog',
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatRippleModule
  ],
  templateUrl: './appointment-form-dialog.component.html',
  styleUrl: './appointment-form-dialog.component.scss'
})
export class AppointmentFormDialogComponent {
  private readonly _dialogRef = inject(MatDialogRef<AppointmentFormDialogComponent>);
  private readonly _fb = inject(FormBuilder);
  public dialog = inject(MatDialog);
  formGroup!: FormGroup;

  constructor() {
    const { title, description } = this._dialogRef._containerInstance._config.data;

    // Init form group
    this.formGroup = this._fb.group({
      title: [title, [Validators.required]],
      description: [description]
    });
  }

  createRecord(): void {
    this._dialogRef.close(this.formGroup.value);
  }

  closeDialog(): void {
    this._dialogRef.close(false);
  }
}
