import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { GroupUserDto } from '../../../models/groups';
import { User } from '../../../models/user';
import { CurrentUserProvider } from '../../../providers/current-user.provider';
import { GroupsService } from '../../../services/groups.service';
import { PageSpinnerService } from '../../common/components/page-spinner/page-spinner.service';
import { DisplayErrorHelper } from '../../common/helpers/display-error.helper';
import { DefaultValuePipe } from '../../pipes/default-value.pipe';
import { RoleNamePipe } from '../../pipes/role-name.pipe';
import { EmptyListComponent } from '../empty-list/empty-list.component';
import { UserAvatarComponent } from '../user-avatar/user-avatar.component';

@Component({
  selector: 'synchro-people',
  standalone: true,
  imports: [MatIconModule, TranslateModule, EmptyListComponent, UserAvatarComponent, DefaultValuePipe, RoleNamePipe],
  templateUrl: './people.component.html',
  styleUrl: './people.component.scss',
})
export class PeopleComponent implements OnInit {
  public groupId: string;
  public isBusy: boolean = false;
  public groupUsers: GroupUserDto[] = [];

  public constructor(
    private readonly groupsService: GroupsService,
    private readonly pageSpinnerService: PageSpinnerService,
    private readonly displayErrorHelper: DisplayErrorHelper,
    private readonly currentUserProvider: CurrentUserProvider,
  ) {
    this.groupId = this.currentUserProvider.currentUser.groupId!;
  }

  public ngOnInit(): void {
    this.load();
  }

  public refresh(): void {
    this.resetSearch();
    this.load();
  }

  public mapUser(user: GroupUserDto): User {
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      image: user.image,
    };
  }

  private load(): void {
    this.setIsBusy(true);

    this.groupsService
      .getGroupPeople(this.groupId)
      .subscribe({
        next: (data: GroupUserDto[]) => {
          this.groupUsers = data;
          console.log(data);
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
    this.groupUsers = [];
  }

  private setIsBusy(isBusy: boolean): void {
    this.isBusy = isBusy;
    this.pageSpinnerService.changeState(isBusy);
  }
}
