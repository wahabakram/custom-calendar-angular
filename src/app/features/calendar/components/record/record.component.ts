import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-record',
  imports: [NgIf, ReactiveFormsModule, MatButtonModule, MatIconModule],
  templateUrl: './record.component.html',
  styleUrl: './record.component.scss'
})
export class RecordComponent {
  @Input() control?: FormGroup;
  @Output() delete = new EventEmitter<void>();
  @Output() edit = new EventEmitter<void>();
}
