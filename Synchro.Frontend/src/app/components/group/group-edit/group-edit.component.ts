import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { GroupDto } from '../../../../models/groups';
import { GroupsService } from '../../../../services/groups.service';
import { MessageService } from '../../../../services/message.service';
import { PageSpinnerModule } from '../../../common/components/page-spinner/page-spinner.module';
import { PageSpinnerService } from '../../../common/components/page-spinner/page-spinner.service';
import { NumberEditControlComponent } from '../../../common/controls/number-edit-control/number-edit-control.component';
import { TextEditControlComponent } from '../../../common/controls/text-edit-control/text-edit-control.component';
import { DisplayErrorHelper } from '../../../common/helpers/display-error.helper';
import { DocumentTypeEnum } from '../../../enums/document-type.enum';
import { ImageSizeEnum } from '../../../enums/image-size.enum';
import { UploadImageComponent } from '../../upload-image/upload-image.component';
import { UserAvatarComponent } from '../../user-avatar/user-avatar.component';
import { IGroupEditConfig, getGroupEditConfig } from './group-edit.config';
import { IGroupEditSchema, getGroupEditSchema } from './group-edit.schema';

@Component({
  selector: 'synchro-group-edit',
  standalone: true,
  imports: [
    PageSpinnerModule,
    UserAvatarComponent,
    TranslateModule,
    MatIconModule,
    CommonModule,
    FormsModule,
    TextEditControlComponent,
    NumberEditControlComponent,
    UploadImageComponent,
  ],
  templateUrl: './group-edit.component.html',
  styleUrl: './group-edit.component.scss',
})
export class GroupEditComponent {
  @ViewChild(UserAvatarComponent) public avatarComponent!: UserAvatarComponent;
  @Output() public setEditMode = new EventEmitter<boolean>();
  @Input({ required: true }) public group: GroupDto = {};

  public DocumentTypeEnum = DocumentTypeEnum;

  public isBusy: boolean = false;
  public ImageSizeEnum = ImageSizeEnum;

  public schema: IGroupEditSchema = getGroupEditSchema();
  public config: IGroupEditConfig = getGroupEditConfig();

  public constructor(
    private readonly pageSpinnerService: PageSpinnerService,
    private readonly messageService: MessageService,
    private readonly displayErrorHelper: DisplayErrorHelper,
    private readonly groupsService: GroupsService,
  ) {}

  // public deleteAvatar(): void {
  //   this.avatarComponent.deleteAvatar();
  // }

  public cancel(): void {
    this.setEditMode.emit(false);
  }

  public setGroupImage(newUrl: string | null): void {
    this.group.image = newUrl;
  }

  public save(): void {
    this.setIsBusy(true);

    this.groupsService
      .updateGroup(this.group)
      .subscribe({
        next: () => {
          this.messageService.showSuccessByCode('NOTIFICATION.GROUP.INFO.CHANGED');
          this.setEditMode.emit(false);
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
