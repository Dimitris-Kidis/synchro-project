import { CommonModule, NgStyle } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { WebContentDto } from '../../../../models/web-content';
import { CurrentUserProvider } from '../../../../providers/current-user.provider';
import { WebContentsService } from '../../../../services/web-content.service';
import { PageSpinnerService } from '../../../common/components/page-spinner/page-spinner.service';
import { DisplayErrorHelper } from '../../../common/helpers/display-error.helper';
import { AudienceTypeEnum } from '../../../enums/audience-type.enum';
import { RoleEnum } from '../../../enums/role.enum';
import { DefaultValuePipe } from '../../../pipes/default-value.pipe';
import { EnumNamePipe } from '../../../pipes/enum-name.pipe';
import { LinkListComponent } from '../../link-list/link-list.component';

@Component({
  selector: 'synchro-post-view',
  standalone: true,
  imports: [MatIconModule, NgStyle, LinkListComponent, DefaultValuePipe, CommonModule, TranslateModule, EnumNamePipe],
  templateUrl: './post-view.component.html',
  styleUrl: './post-view.component.scss',
})
export class PostViewComponent {
  @Input({ required: true }) public post: WebContentDto;
  @Input() public hasActions: boolean = false;

  @Output() public refreshPostsList = new EventEmitter<void>();
  @Output() public switchEditMode = new EventEmitter<WebContentDto>();

  public isBusy: boolean = false;
  public hasAdminRole: boolean = false;
  public AudienceTypeEnum = AudienceTypeEnum;

  public constructor(
    private readonly currentUserProvider: CurrentUserProvider,
    private readonly webContentsService: WebContentsService,
    private readonly pageSpinnerService: PageSpinnerService,
    private readonly displayErrorHelper: DisplayErrorHelper,
  ) {
    this.hasAdminRole = this.currentUserProvider.hasSomeRole(RoleEnum.Admin);
  }

  public editPost(): void {
    this.switchEditMode.emit(this.post);
  }

  public deletePost(): void {
    if (!this.post.id) {
      return;
    }

    this.setIsBusy(true);

    this.webContentsService
      .deletePost(this.post.id)
      .subscribe({
        next: () => {
          this.refreshPostsList.emit();
        },
        error: (err: HttpErrorResponse) => {
          this.displayErrorHelper.displayErrorFunc(err);
        },
      })
      .add(() => {
        this.setIsBusy(false);
      });
  }

  private setIsBusy(isBusy: boolean): void {
    this.isBusy = isBusy;
    this.pageSpinnerService.changeState(isBusy);
  }
}
