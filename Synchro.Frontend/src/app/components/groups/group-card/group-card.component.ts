import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CreateRequestCommand } from '../../../../commands/requests-commands';
import { GroupDto } from '../../../../models/groups';
import { CurrentUserProvider } from '../../../../providers/current-user.provider';
import { MessageService } from '../../../../services/message.service';
import { RequestsService } from '../../../../services/requests.service';
import { PageSpinnerService } from '../../../common/components/page-spinner/page-spinner.service';
import { DisplayErrorHelper } from '../../../common/helpers/display-error.helper';
import { ImageSizeEnum } from '../../../enums/image-size.enum';
import { RequestTypeEnum } from '../../../enums/requests.enum';
import { DefaultValuePipe } from '../../../pipes/default-value.pipe';
import { GroupAvatarComponent } from '../../group-avatar/group-avatar.component';

@Component({
  selector: 'synchro-group-card',
  standalone: true,
  imports: [GroupAvatarComponent, TranslateModule, DefaultValuePipe],
  templateUrl: './group-card.component.html',
  styleUrl: './group-card.component.scss',
})
export class GroupCardComponent {
  @Input({ required: true }) public group: GroupDto;
  public ImageSizeEnum = ImageSizeEnum;

  public isBusy: boolean = false;

  public constructor(
    private readonly requestsService: RequestsService,
    private readonly pageSpinnerService: PageSpinnerService,
    private readonly messageService: MessageService,
    private readonly displayErrorHelper: DisplayErrorHelper,
    private readonly currentUserProvider: CurrentUserProvider,
  ) {}

  public sendRequestToJoinGroup(): void {
    const command: CreateRequestCommand = {
      type: RequestTypeEnum.GetInGroup,
      senderId: this.currentUserProvider.currentUser.id!,
      groupId: this.group.id,
      senderName: this.currentUserProvider.currentUser.firstName + ' ' + this.currentUserProvider.currentUser.lastName,
    };

    this.setIsBusy(true);

    this.requestsService
      .createRequest(command)
      .subscribe({
        next: () => {
          this.messageService.showSuccessByCode('NOTIFICATION.REQUEST.HAS_BEEN_SENT');
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
