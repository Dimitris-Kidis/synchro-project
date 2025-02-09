import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { User } from '../../../../models/user';
import { WikiPageDto } from '../../../../models/wiki-page';
import { CurrentUserProvider } from '../../../../providers/current-user.provider';
import { WikiPagesService } from '../../../../services/wiki-pages.service';
import { PageSpinnerService } from '../../../common/components/page-spinner/page-spinner.service';
import { DisplayErrorHelper } from '../../../common/helpers/display-error.helper';
import { AudienceTypeEnum } from '../../../enums/audience-type.enum';
import { ImageSizeEnum } from '../../../enums/image-size.enum';
import { RoleEnum } from '../../../enums/role.enum';
import { DefaultValuePipe } from '../../../pipes/default-value.pipe';
import { TagsComponent } from '../../tags/tags.component';
import { UserAvatarComponent } from '../../user-avatar/user-avatar.component';

@Component({
  selector: 'synchro-wiki-view',
  standalone: true,
  imports: [MatIconModule, DefaultValuePipe, CommonModule, TranslateModule, TagsComponent, UserAvatarComponent],
  templateUrl: './wiki-view.component.html',
  styleUrl: './wiki-view.component.scss',
})
export class WikiViewComponent {
  @Input({ required: true }) public wikiPage: WikiPageDto;
  @Input() public hasActions: boolean = false;

  @Output() public refreshWikiPagesList = new EventEmitter<void>();
  @Output() public switchEditMode = new EventEmitter<WikiPageDto>();

  public isBusy: boolean = false;
  public hasAdminRole: boolean = false;
  public AudienceTypeEnum = AudienceTypeEnum;
  public ImageSizeEnum = ImageSizeEnum;

  public constructor(
    private readonly currentUserProvider: CurrentUserProvider,
    private readonly pageSpinnerService: PageSpinnerService,
    private readonly displayErrorHelper: DisplayErrorHelper,
    private readonly wikiPagesService: WikiPagesService,
  ) {
    this.hasAdminRole = this.currentUserProvider.hasSomeRole(RoleEnum.Admin);
  }

  public editWikiPage(): void {
    this.switchEditMode.emit(this.wikiPage);
  }

  public mapUser(userNames: string[], userAvatar?: string | null): User {
    return {
      firstName: userNames[0],
      lastName: userNames[1],
      image: userAvatar,
    };
  }

  public deleteWikiPage(): void {
    if (!this.wikiPage.id) {
      return;
    }

    this.setIsBusy(true);

    this.wikiPagesService
      .deleteWikiPage(this.wikiPage.id)
      .subscribe({
        next: () => {
          this.refreshWikiPagesList.emit();
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
