import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { CalendarEventDto } from '../../../../models/calendar-event';
import { User } from '../../../../models/user';
import { CurrentUserProvider } from '../../../../providers/current-user.provider';
import { CalendarEventsService } from '../../../../services/calendar-event.service';
import { PageSpinnerService } from '../../../common/components/page-spinner/page-spinner.service';
import { DisplayErrorHelper } from '../../../common/helpers/display-error.helper';
import { ImageSizeEnum } from '../../../enums/image-size.enum';
import { RoleEnum } from '../../../enums/role.enum';
import { DefaultValuePipe } from '../../../pipes/default-value.pipe';
import { LinkListComponent } from '../../link-list/link-list.component';
import { UserAvatarComponent } from '../../user-avatar/user-avatar.component';

@Component({
  selector: 'synchro-event-view-dialog',
  standalone: true,
  imports: [
    CommonModule,
    DefaultValuePipe,
    LinkListComponent,
    MatDialogModule,
    MatIconModule,
    TranslateModule,
    UserAvatarComponent,
  ],
  templateUrl: './event-view-dialog.component.html',
  styleUrl: './event-view-dialog.component.scss',
})
export class EventViewDialogComponent implements OnInit {
  public event: CalendarEventDto = {};
  public isBusy: boolean = false;
  public hasAccess: boolean = false;
  public ImageSizeEnum = ImageSizeEnum;

  public constructor(
    @Inject(MAT_DIALOG_DATA) public readonly data: any,
    private readonly pageSpinnerService: PageSpinnerService,
    private readonly displayErrorHelper: DisplayErrorHelper,
    private readonly calendarEventsService: CalendarEventsService,
    private readonly currentUserProvider: CurrentUserProvider,
    public dialogRef: MatDialogRef<EventViewDialogComponent>,
  ) {
    this.hasAccess = this.currentUserProvider.hasSomeRole(RoleEnum.Admin, RoleEnum.Manager);
  }

  public ngOnInit(): void {
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

  public editEvent(): void {
    this.dialogRef.close({ hasToRefresh: true, updateEventId: this.data.id });
  }

  public deleteEvent(): void {
    this.setIsBusy(true);

    this.calendarEventsService
      .deleteCalendarEvent(this.data.id)
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

  public mapUser(userNames: string[], userAvatar?: string | null): User {
    return {
      firstName: userNames[0],
      lastName: userNames[1],
      image: userAvatar,
    };
  }

  private setIsBusy(isBusy: boolean): void {
    this.isBusy = isBusy;
    this.pageSpinnerService.changeState(isBusy);
  }
}
