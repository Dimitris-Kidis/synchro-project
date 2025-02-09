import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { environment } from '../../../environment/environment';
import { CalendarEventDto } from '../../../models/calendar-event';
import { CurrentUserProvider } from '../../../providers/current-user.provider';
import { CalendarEventsService } from '../../../services/calendar-event.service';
import { PageSpinnerService } from '../../common/components/page-spinner/page-spinner.service';
import { DisplayErrorHelper } from '../../common/helpers/display-error.helper';
import { EventEditDialogComponent } from './event-edit-dialog/event-edit-dialog.component';
import { EventViewDialogComponent } from './event-view-dialog/event-view-dialog.component';

@Component({
  selector: 'synchro-calendar',
  standalone: true,
  imports: [FullCalendarModule, TranslateModule, MatDialogModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent implements OnInit {
  public groupId: string;
  public isBusy: boolean = false;

  public calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    weekends: true,
    eventClick: this.openEvent.bind(this),
    events: [],
    locale: this.getLocale(),
    dateClick: this.createEvent.bind(this),
    height: '700px',
    headerToolbar: {
      left: 'prev,next today customButton',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek,dayGridDay',
    },
    firstDay: 1,
    customButtons: {
      customButton: {
        text: '+',
        click: this.createEvent.bind(this),
      },
    },
    dayCellClassNames: (arg) => {
      if (arg.date.getDay() === 0 || arg.date.getDay() === 6) {
        return ['sunday-cell'];
      }
      return ['weekday-cell'];
    },
  };

  public constructor(
    private readonly dialog: MatDialog,
    private readonly translate: TranslateService,
    private readonly pageSpinnerService: PageSpinnerService,
    private readonly displayErrorHelper: DisplayErrorHelper,
    private readonly calendarEventsService: CalendarEventsService,
    private readonly currentUserProvider: CurrentUserProvider,
  ) {
    this.groupId = this.currentUserProvider.currentUser.groupId!;
  }

  public ngOnInit(): void {
    this.loadAll();
  }

  public openEvent(arg: any): void {
    const dialogRef = this.dialog.open(EventViewDialogComponent, {
      autoFocus: false,
      panelClass: 'calendar-event-modal',
      disableClose: false,
      closeOnNavigation: true,
      data: {
        id: arg.event.id,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      const { hasToRefresh, updateEventId } = result;

      if (hasToRefresh) {
        this.loadAll();
      }

      if (updateEventId) {
        this.updateEvent(updateEventId);
      }
    });
  }

  public createEvent(arg: any): void {
    const dialogRef = this.dialog.open(EventEditDialogComponent, {
      autoFocus: false,
      panelClass: 'calendar-event-modal',
      disableClose: false,
      closeOnNavigation: true,
      data: {
        date: arg.date,
      },
    });

    dialogRef.afterClosed().subscribe((hasToRefresh: boolean) => {
      if (hasToRefresh) {
        this.loadAll();
      }
    });
  }

  public updateEvent(id: string): void {
    const dialogRef = this.dialog.open(EventEditDialogComponent, {
      autoFocus: false,
      panelClass: 'calendar-event-modal',
      disableClose: false,
      closeOnNavigation: true,
      data: {
        id: id,
      },
    });

    dialogRef.afterClosed().subscribe((hasToRefresh: boolean) => {
      if (hasToRefresh) {
        this.loadAll();
      }
    });
  }

  private getLocale(): string {
    this.translate.onLangChange.subscribe((event) => {
      this.calendarOptions.locale = event.lang;
    });

    const savedLanguage = localStorage.getItem(environment.localStorageLocaleVariableName);
    return savedLanguage || this.translate.defaultLang || this.translate.currentLang;
  }

  private setIsBusy(isBusy: boolean): void {
    this.isBusy = isBusy;
    this.pageSpinnerService.changeState(isBusy);
  }

  private loadAll(): void {
    this.setIsBusy(true);

    this.calendarEventsService
      .getCalendarEventsPaginated(this.groupId)
      .subscribe({
        next: (events: CalendarEventDto[]) => {
          this.calendarOptions.events = this.mapEventsToCalendar(events);

          console.log(events);
        },
        error: (err: HttpErrorResponse) => {
          this.displayErrorHelper.displayErrorFunc(err);
        },
      })
      .add(() => this.setIsBusy(false));
  }

  private mapEventsToCalendar(events: CalendarEventDto[]): EventInput[] {
    return events.map((event) => ({
      id: event.id,
      title: event.title,
      start: event.startDateTime,
      end: event.endDateTime,
      extendedProps: {
        description: event.description,
        content: event.content,
        links: event.links,
        createdBy: event.createdBy,
        lastModifiedBy: event.lastModifiedBy,
        createdAt: event.createdAt,
        lastModifiedAt: event.lastModifiedAt,
        userId: event.userId,
        groupId: event.groupId,
      },
    }));
  }
}
