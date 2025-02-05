import { Injectable } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';

export interface CalendarEvent {
  day: number;
  week: number;
  title?: string;
  description?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private readonly _eventData: CalendarEvent = {
    day: 0,
    week: 0,
    title: '',
    description: ''
  };

  getDefaultDialogConfig(data?: CalendarEvent): MatDialogConfig<CalendarEvent> {
    return {
      width: '520px',
      data: data ?? this._eventData
    };
  }
}
