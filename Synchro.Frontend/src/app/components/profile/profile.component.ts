import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { UsersService } from '../../../services/users.service';
import { PageSpinnerService } from '../../common/components/page-spinner/page-spinner.service';
import { DisplayErrorHelper } from '../../common/helpers/display-error.helper';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';

@Component({
  selector: 'synchro-profile',
  standalone: true,
  imports: [ProfileViewComponent, ProfileEditComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  public user: User = {};
  public isBusy: boolean = false;
  public isEditMode: boolean = false;

  public constructor(
    private readonly usersService: UsersService,
    private readonly displayErrorHelper: DisplayErrorHelper,
    private readonly pageSpinnerService: PageSpinnerService,
  ) {}

  public ngOnInit(): void {
    this.setIsBusy(true);

    this.usersService
      .getUser()
      .subscribe({
        next: (data: User) => (this.user = data),
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
