import { Injectable } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';

export interface CalendarEvent {
  day: number;
  week: number;
  title?: string;
  description?: string;
}

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  private eventData: CalendarEvent = {
    day: 0,
    week: 0,
    title: '',
    description: '',
  };

  constructor() {}

  getDefaultDialogConfig(data?: CalendarEvent): MatDialogConfig<CalendarEvent> {
    return {
      width: '520px',
      data: data ?? this.eventData,
    };
  }
}
