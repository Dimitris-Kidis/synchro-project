import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RequestDto } from '../../../../commands/requests-commands';
import { User } from '../../../../models/user';
import { CurrentUserProvider } from '../../../../providers/current-user.provider';
import { RequestsService } from '../../../../services/requests.service';
import { PageSpinnerService } from '../../../common/components/page-spinner/page-spinner.service';
import { DisplayErrorHelper } from '../../../common/helpers/display-error.helper';
import { DividerPositionEnum } from '../../../enums/divider.enum';
import { RequestStatusEnum } from '../../../enums/request-status.enum';
import { RequestTypeEnum } from '../../../enums/requests.enum';
import { RequestStatusPipe } from '../../../pipes/request-status.pipe';
import { RequestTypeNamePipe } from '../../../pipes/request-type-name.pipe';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'synchro-request-item',
  standalone: true,
  imports: [SharedModule, RequestTypeNamePipe, RequestStatusPipe, MatIconModule],
  templateUrl: './request-item.component.html',
  styleUrl: './request-item.component.scss',
})
export class RequestItemComponent {
  @Input({ required: true }) public request: RequestDto;
  @Output() public refreshRequests = new EventEmitter<void>();

  public user: User = {};
  public isBusy: boolean = false;

  public DividerPositionEnum = DividerPositionEnum;
  public RequestStatusEnum = RequestStatusEnum;

  public constructor(
    private readonly currentUserProvider: CurrentUserProvider,
    private readonly requestsService: RequestsService,
    private readonly pageSpinnerService: PageSpinnerService,
    private readonly displayErrorHelper: DisplayErrorHelper,
  ) {
    this.user = this.currentUserProvider.currentUser;
  }

  public deleteRequest(id: string): void {
    this.setIsBusy(true);

    this.requestsService
      .deleteRequest(id)
      .subscribe({
        next: () => this.refreshRequests.emit(),
        error: (err: HttpErrorResponse) => {
          this.displayErrorHelper.displayErrorFunc(err);
        },
      })
      .add(() => this.setIsBusy(false));
  }

  public updateRequest(requestId: string, isApproved: boolean, requestType: RequestTypeEnum): void {
    this.setIsBusy(true);

    this.requestsService
      .updateRequest({ id: requestId, isApproved })
      .subscribe({
        next: () => {
          this.refreshRequests.emit();

          if (isApproved && requestType === RequestTypeEnum.InviteUserToGroup) {
            window.location.reload();
          }
        },
        error: (err: HttpErrorResponse) => {
          this.displayErrorHelper.displayErrorFunc(err);
        },
      })
      .add(() => this.setIsBusy(false));
  }

  private setIsBusy(isBusy: boolean): void {
    this.isBusy = isBusy;
    this.pageSpinnerService.changeState(isBusy);
  }
}
