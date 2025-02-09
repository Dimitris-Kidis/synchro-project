import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CalendarEventDto } from '../models/calendar-event';

@Injectable({
  providedIn: 'root',
})
export class CalendarEventsService {
  public constructor(private readonly _httpService: HttpClient) {}

  public getCalendarEventsPaginated(groupId: string): Observable<CalendarEventDto[]> {
    return this._httpService.get<CalendarEventDto[]>(`api/calendar-events/group/${groupId}`);
  }

  public getCalendarEvent(id: string): Observable<CalendarEventDto> {
    return this._httpService.get<CalendarEventDto>(`api/calendar-events/${id}`);
  }

  public deleteCalendarEvent(id: string): Observable<any> {
    return this._httpService.delete<any>(`api/calendar-events/${id}`);
  }

  public createCalendarEvent(command: CalendarEventDto): Observable<any> {
    return this._httpService.post<any>(`api/calendar-events`, command);
  }

  public updateCalendarEvent(command: CalendarEventDto): Observable<any> {
    return this._httpService.put<any>(`api/calendar-events`, command);
  }
}
