import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GroupDto } from '../../../models/groups';
import { CurrentUserProvider } from '../../../providers/current-user.provider';
import { GroupsService } from '../../../services/groups.service';
import { PageSpinnerService } from '../../common/components/page-spinner/page-spinner.service';
import { DisplayErrorHelper } from '../../common/helpers/display-error.helper';
import { GroupEditComponent } from './group-edit/group-edit.component';
import { GroupViewComponent } from './group-view/group-view.component';

@Component({
  selector: 'synchro-group',
  standalone: true,
  imports: [GroupViewComponent, GroupEditComponent],
  templateUrl: './group.component.html',
  styleUrl: './group.component.scss',
})
export class GroupComponent implements OnInit {
  public group: GroupDto = {};
  public isBusy: boolean = false;
  public isEditMode: boolean = false;
  public groupId: string;

  public constructor(
    private readonly groupsService: GroupsService,
    private readonly displayErrorHelper: DisplayErrorHelper,
    private readonly pageSpinnerService: PageSpinnerService,
    private readonly currentUserProvider: CurrentUserProvider,
  ) {
    this.groupId = this.currentUserProvider.currentUser.groupId!;
  }

  public ngOnInit(): void {
    this.setIsBusy(true);

    this.groupsService
      .getGroup(this.groupId)
      .subscribe({
        next: (data: GroupDto) => (this.group = data),
        error: (err: HttpErrorResponse) => {
          this.displayErrorHelper.displayErrorFunc(err);
        },
      })
      .add(() => this.setIsBusy(false));
  }

  public setEditMode(isEditMode: boolean): void {
    this.isEditMode = isEditMode;
  }

  private setIsBusy(isBusy: boolean): void {
    this.isBusy = isBusy;
    this.pageSpinnerService.changeState(isBusy);
  }
}
