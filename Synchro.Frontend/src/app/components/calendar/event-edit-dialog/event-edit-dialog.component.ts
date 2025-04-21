import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { TranslateModule } from '@ngx-translate/core';
import { QuillModule } from 'ngx-quill';
import { CalendarEventDto } from '../../../../models/calendar-event';
import { CurrentUserProvider } from '../../../../providers/current-user.provider';
import { CalendarEventsService } from '../../../../services/calendar-event.service';
import { PageSpinnerService } from '../../../common/components/page-spinner/page-spinner.service';
import { DateEditControlComponent } from '../../../common/controls/date-edit-control/date-edit-control.component';
import { TextEditControlComponent } from '../../../common/controls/text-edit-control/text-edit-control.component';
import { DisplayErrorHelper } from '../../../common/helpers/display-error.helper';
import { RoleEnum } from '../../../enums/role.enum';
import { LinkListComponent } from '../../link-list/link-list.component';
import { EditorConfig } from '../../text-editor/editor.config';
import { IEventEditConfig, getEventEditConfig } from './event-edit.config';
import { EventEditQuillConfig } from './event-edit.quill.config';
import { IEventEditSchema, getEventEditSchema } from './event-edit.schema';

@Component({
  selector: 'synchro-event-edit-dialog',
  standalone: true,
  imports: [
    TranslateModule,
    FormsModule,
    TextEditControlComponent,
    QuillModule,
    CommonModule,
    LinkListComponent,
    DateEditControlComponent,
    MatTimepickerModule,
    MatFormFieldModule,
    CommonModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './event-edit-dialog.component.html',
  styleUrl: './event-edit-dialog.component.scss',
})
export class EventEditDialogComponent implements OnInit {
  public event: CalendarEventDto = {};

  public isBusy: boolean = false;
  public hasAccess: boolean = false;
  public isCreateMode: boolean = false;

  public quillConfig: EditorConfig = EventEditQuillConfig.config;

  public config: IEventEditConfig = getEventEditConfig();
  public schema: IEventEditSchema = getEventEditSchema();

  public constructor(
    @Inject(MAT_DIALOG_DATA) public readonly data: any,
    public dialogRef: MatDialogRef<EventEditDialogComponent>,
    private readonly pageSpinnerService: PageSpinnerService,
    private readonly displayErrorHelper: DisplayErrorHelper,
    private readonly calendarEventsService: CalendarEventsService,
    private readonly currentUserProvider: CurrentUserProvider,
  ) {
    this.hasAccess = this.currentUserProvider.hasSomeRole(RoleEnum.Admin, RoleEnum.Manager);
  }

  public ngOnInit(): void {
    if (!this.data.id) {
      this.isCreateMode = true;
      return;
    }

    this.setIsBusy(true);

    this.calendarEventsService
      .getCalendarEvent(this.data.id)
      .subscribe({
        next: (event: CalendarEventDto) => {
          this.event = event;
        },
        error: (err: HttpErrorResponse) => {
          this.displayErrorHelper.displayErrorFunc(err);
        },
      })
      .add(() => {
        this.setIsBusy(false);
      });
  }

  public save(): void {
    this.setIsBusy(true);

    const action$ = this.isCreateMode
      ? this.calendarEventsService.createCalendarEvent(this.event)
      : this.calendarEventsService.updateCalendarEvent(this.event);

    action$
      .subscribe({
        next: () => {
          this.dialogRef.close({ hasToRefresh: true });
        },
        error: (err: HttpErrorResponse) => {
          this.displayErrorHelper.displayErrorFunc(err);
        },
      })
      .add(() => {
        this.setIsBusy(false);
      });
  }

  public cancel(): void {
    this.dialogRef.close({ hasToRefresh: false });
  }

  public formatTime(date?: Date): string {
    if (!date) return '';
    const d = new Date(date);
    const h = d.getHours().toString().padStart(2, '0');
    const m = d.getMinutes().toString().padStart(2, '0');
    return `${h}:${m}`;
  }

  public onStartTimeChange(newTime: Date): void {
    if (!this.event.startDateTime) {
      this.event.startDateTime = new Date();
    }

    const updated = new Date(this.event.startDateTime);
    updated.setHours(newTime.getHours(), newTime.getMinutes(), 0, 0);

    this.event.startDateTime = updated;
  }

  private setIsBusy(isBusy: boolean): void {
    this.isBusy = isBusy;
    this.pageSpinnerService.changeState(isBusy);
  }
}
