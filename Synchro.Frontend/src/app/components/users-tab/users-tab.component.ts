import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { IPaginatorResult, ISearchPaginatedRequest } from '../../../models/common';
import { GetUserSearchQueryDto, User } from '../../../models/user';
import { UsersService } from '../../../services/users.service';
import { PageSpinnerService } from '../../common/components/page-spinner/page-spinner.service';
import { TextEditControlComponent } from '../../common/controls/text-edit-control/text-edit-control.component';
import { DisplayErrorHelper } from '../../common/helpers/display-error.helper';
import { ImageSizeEnum } from '../../enums/image-size.enum';
import { RoleEnum } from '../../enums/role.enum';
import { RoleNamePipe } from '../../pipes/role-name.pipe';
import { EmptyListComponent } from '../empty-list/empty-list.component';
import { UserAvatarComponent } from '../user-avatar/user-avatar.component';
import { IUsersSearchConfig, getUsersSearchConfig } from './users-tab.config';
import { IUsersSearchSchema, getUsersSearchSchema } from './users-tab.schema';

@Component({
  selector: 'synchro-users-tab',
  standalone: true,
  imports: [
    DatePipe,
    EmptyListComponent,
    FormsModule,
    MatIconModule,
    MatTooltipModule,
    RoleNamePipe,
    TextEditControlComponent,
    TranslateModule,
    UserAvatarComponent,
  ],
  templateUrl: './users-tab.component.html',
  styleUrl: './users-tab.component.scss',
})
export class UsersTabComponent implements OnInit {
  public searchInput: string = '';
  public isBusy: boolean = false;

  public ImageSizeEnum = ImageSizeEnum;
  public RoleEnum = RoleEnum;

  public totalCount: number = 0;
  public hasMore: boolean = false;
  public users: GetUserSearchQueryDto[] = [];
  public queryFilters: ISearchPaginatedRequest = { paginatedRequest: { pageIndex: 1, pageSize: 30 } };

  public config: IUsersSearchConfig = getUsersSearchConfig();
  public schema: IUsersSearchSchema = getUsersSearchSchema();

  public constructor(
    private readonly usersService: UsersService,
    private readonly pageSpinnerService: PageSpinnerService,
    private readonly displayErrorHelper: DisplayErrorHelper,
    private readonly destroyRef: DestroyRef,
  ) {}

  public ngOnInit(): void {
    this.load();
  }

  public refresh(): void {
    this.resetSearch();
    this.load();
  }

  public search(): void {
    this.resetSearch();
    this.load();
  }

  public mapUser(user: GetUserSearchQueryDto): User {
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      image: user.image,
    };
  }

  public updateUserRole(id: string, role: RoleEnum, isUpgrade: boolean): void {
    const updatedRole: RoleEnum = isUpgrade ? role + 1 : role - 1;

    this.usersService
      .updateUserRole({ id, role: updatedRole })
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.refresh();
        },
        error: (err: HttpErrorResponse) => {
          this.displayErrorHelper.displayErrorFunc(err);
        },
      });
  }

  private load(): void {
    this.setIsBusy(true);

    this.usersService
      .getUserSearchPaginated(this.queryFilters)
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (result: IPaginatorResult<GetUserSearchQueryDto>) => {
          this.users = [...this.users, ...result.items];
          this.hasMore = result.hasMore;
          this.totalCount = result.total;
        },
        error: (err: HttpErrorResponse) => {
          this.displayErrorHelper.displayErrorFunc(err);
        },
      })
      .add(() => {
        this.setIsBusy(false);
      });
  }

  private resetSearch(): void {
    this.queryFilters.paginatedRequest.pageIndex = 1;
    this.users = [];
  }

  private setIsBusy(isBusy: boolean): void {
    this.isBusy = isBusy;
    this.pageSpinnerService.changeState(isBusy);
  }
}
