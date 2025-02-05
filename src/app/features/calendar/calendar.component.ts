import { Component, inject } from '@angular/core';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { formatDate, NgFor } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { getDates } from '@utils/dates';
import { pull, range } from '@utils/array';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DAY_MILLISECONDS, DAYS_IN_WEEK } from '@constants';

import { CalendarService, CalendarEvent } from './services/calendar.service';
import { HeaderComponent } from './components/header/header.component';
import { RecordComponent } from './components/record/record.component';
import { AppointmentFormDialogComponent } from './components/appointment-form-dialog/appointment-form-dialog.component';

@Component({
  selector: 'app-calendar',
  imports: [NgFor, DragDropModule, HeaderComponent, RecordComponent, MatCardModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent {
  private readonly _fb = inject(FormBuilder);
  private readonly _calendarService = inject(CalendarService);
  private _dialogRef!: MatDialogRef<AppointmentFormDialogComponent, CalendarEvent>;
  private readonly _inputConfig: MatDialogConfig<CalendarEvent> = this._calendarService.getDefaultDialogConfig();
  private _monthOffset = 0;
  private _events: Record<string, FormGroup[]> = {};

  readonly dialog = inject(MatDialog);

  today = new Date();
  tempDate = new Date();
  month = formatDate(this.today, 'MMMM yyyy', 'en-US');

  dates = getDates(5);

  weeks = range(this.dates);
  days = range(DAYS_IN_WEEK);

  private _updateTempDate(year: number, month: number): void {
    this.tempDate = new Date(year, month, 1);
  }

  addEditRecord(day: number, week: number, selectedItemIdx?: number): void {
    const date = this.getDate(week, day);
    this._inputConfig.data = {
      ...this._inputConfig.data,
      day: day,
      week: week,
      title: '',
      description: ''
    };

    if (this.haveSelectedItem(selectedItemIdx as number)) {
      this._inputConfig.data = {
        ...this._inputConfig.data,
        ...this._events[date][selectedItemIdx as number].value
      };
    }

    this._dialogRef = this.dialog.open(AppointmentFormDialogComponent, this._inputConfig);
    this._dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const tempFormGroup = this._fb.group({
          title: [result.title],
          description: [result.description]
        });

        if (!this._events[date]) {
          this._events[date] = [];
        }

        if (this.haveSelectedItem(selectedItemIdx as number)) {
          this._events[date][selectedItemIdx as number] = tempFormGroup;
        } else {
          this._events[date].push(tempFormGroup);
        }
      }
    });
  }

  getEvents(week: number, day: number): FormGroup[] {
    const date = this.getDate(week, day);
    return this._events[date] || [];
  }

  getDate(week: number, day: number): string {
    const date = new Date(this.tempDate);
    date.setDate(this.dates[week][day]);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }

  haveSelectedItem(index: number): boolean {
    return index !== undefined && index > -1;
  }

  deleteRecord(day: number, week: number, control: FormGroup): void {
    const date = this.getDate(week, day);
    pull(this._events[date], control);
  }

  dropItem(event: CdkDragDrop<FormGroup[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const [week, day] = event.container.id.split(',');
      const date = this.getDate(parseInt(week, 10), parseInt(day, 10));
      const previousDate = this.getDate(
        parseInt(event.previousContainer.id.split(',')[0], 10),
        parseInt(event.previousContainer.id.split(',')[1], 10)
      );
      const item = event.previousContainer.data.splice(event.previousIndex, 1)[0];
      if (!this._events[date]) {
        this._events[date] = [];
      }
      this._events[date].splice(event.currentIndex, 0, item);
      if (this._events[previousDate].length === 0) {
        delete this._events[previousDate];
      }
    }
  }

  monthChange(option: string): void {
    if (option === 'previous') {
      this._monthOffset--;
    } else if (option === 'next') {
      this._monthOffset++;
    }

    const weeks = this.dates.length;
    const date = new Date(this.today);
    date.setMonth(date.getMonth() + this._monthOffset);
    date.setDate(1); // Set the date to the first day of the month
    const dayOfTheWeek = date.getDay();
    const startWeekDiff = DAY_MILLISECONDS * dayOfTheWeek;
    const startTime = date.getTime() - startWeekDiff;

    const newDates = [];
    for (let week = 0; week < weeks; week++) {
      const days = [];
      for (let day = 0; day < DAYS_IN_WEEK; day++) {
        const time = startTime + DAYS_IN_WEEK * week * DAY_MILLISECONDS + day * DAY_MILLISECONDS;
        days.push(new Date(time).getDate());
      }
      newDates.push(days);
    }

    this.dates = newDates;
    // Update the month name
    this.month = formatDate(date, 'MMMM yyyy', 'en-US');
    this._updateTempDate(date.getFullYear(), date.getMonth());
  }
}
