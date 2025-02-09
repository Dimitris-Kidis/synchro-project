import { CommonModule, NgClass } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';
import { User } from '../../../models/user';
import { CurrentUserProvider } from '../../../providers/current-user.provider';
import { AttachmentsService } from '../../../services/attachment.service';
import { PageSpinnerModule } from '../../common/components/page-spinner/page-spinner.module';
import { PageSpinnerService } from '../../common/components/page-spinner/page-spinner.service';
import { DisplayErrorHelper } from '../../common/helpers/display-error.helper';
import { ImageSizeEnum } from '../../enums/image-size.enum';
import { InitialsPipe } from '../../pipes/initials.pipe';

@Component({
  selector: 'synchro-user-avatar',
  standalone: true,
  imports: [CommonModule, InitialsPipe, NgClass, TranslatePipe, MatIconModule, PageSpinnerModule],
  templateUrl: './user-avatar.component.html',
  styleUrl: './user-avatar.component.scss',
})
export class UserAvatarComponent implements OnInit {
  @Input() public size: ImageSizeEnum = ImageSizeEnum.Medium;
  @Input() public label: string | null = null;
  @Input() public isInUploadMode = false;
  @Input() public customUser: User | null = null;

  public user: User;
  public isLoading = true;
  public isBusy: boolean = false;

  public constructor(
    private readonly currentUserProvider: CurrentUserProvider,
    private readonly attachmentsService: AttachmentsService,
    private readonly pageSpinnerService: PageSpinnerService,
    private readonly displayErrorHelper: DisplayErrorHelper,
  ) {}

  public ngOnInit(): void {
    if (!this.customUser) {
      this.user = this.currentUserProvider.currentUser;
    } else {
      this.user = this.customUser;
    }
    this.isLoading = false;
  }

  public handleClick(): void {
    if (this.isInUploadMode) {
      const fileInput = document.querySelector<HTMLInputElement>('.hidden-file-input');
      fileInput?.click();
    }
  }

  public onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input?.files?.[0];

    if (file) {
      this.setIsBusy(true);
      this.attachmentsService
        .createAttachment(file)
        .subscribe({
          next: (newUrl: string) => (this.user.image = newUrl),
          error: (err: HttpErrorResponse) => {
            this.displayErrorHelper.displayErrorFunc(err);
          },
        })
        .add(() => this.setIsBusy(false));
    }
  }

  public deleteAvatar(): void {
    this.setIsBusy(true);

    this.attachmentsService
      .deleteAttachment()
      .subscribe({
        next: () => (this.user.image = null),
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
