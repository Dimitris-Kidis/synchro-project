import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { ChangePasswordDto } from '../../../../models/auth';
import { User } from '../../../../models/user';
import { AuthenticationService } from '../../../../services/authentification.service';
import { MessageService } from '../../../../services/message.service';
import { UsersService } from '../../../../services/users.service';
import { PageSpinnerModule } from '../../../common/components/page-spinner/page-spinner.module';
import { PageSpinnerService } from '../../../common/components/page-spinner/page-spinner.service';
import { NumberEditControlComponent } from '../../../common/controls/number-edit-control/number-edit-control.component';
import { TextEditControlComponent } from '../../../common/controls/text-edit-control/text-edit-control.component';
import { DisplayErrorHelper } from '../../../common/helpers/display-error.helper';
import { ImageSizeEnum } from '../../../enums/image-size.enum';
import { UserAvatarComponent } from '../../user-avatar/user-avatar.component';
import { IProfileEditConfig, getProfileEditConfig } from './profile-edit.config';
import { IProfileEditSchema, getProfileEditSchema } from './profile-edit.schema';

@Component({
  selector: 'synchro-profile-edit',
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
  ],
  templateUrl: './profile-edit.component.html',
  styleUrl: './profile-edit.component.scss',
})
export class ProfileEditComponent {
  @ViewChild(UserAvatarComponent) public avatarComponent!: UserAvatarComponent;
  @Output() public setEditMode = new EventEmitter<boolean>();
  @Input({ required: true }) public user: User = {};

  public isBusy: boolean = false;
  public ImageSizeEnum = ImageSizeEnum;
  public passwordDto: ChangePasswordDto = {};

  public requirements = {
    hasUppercase: false,
    hasNumber: false,
    hasSpecialChar: false,
    isValidLength: false,
  };

  public schema: IProfileEditSchema = getProfileEditSchema();
  public config: IProfileEditConfig = getProfileEditConfig();

  public constructor(
    private readonly pageSpinnerService: PageSpinnerService,
    private readonly messageService: MessageService,
    private readonly displayErrorHelper: DisplayErrorHelper,
    private readonly authenticationService: AuthenticationService,
    private readonly usersService: UsersService,
  ) {}

  public deleteAvatar(): void {
    this.avatarComponent.deleteAvatar();
  }

  public cancel(): void {
    this.setEditMode.emit(false);
  }

  public save(): void {
    this.setIsBusy(true);

    this.usersService
      .updateUser({
        id: this.user.id,
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        age: this.user.age,
      })
      .subscribe({
        next: () => {
          this.messageService.showSuccessByCode('NOTIFICATION.PROFILE.INFO.CHANGED');
          this.setEditMode.emit(false);
        },
        error: (err: HttpErrorResponse) => {
          this.displayErrorHelper.displayErrorFunc(err);
        },
      })
      .add(() => this.setIsBusy(false));
  }

  public resetPassword(): void {
    this.setIsBusy(true);

    this.authenticationService
      .resetPassword(this.passwordDto)
      .subscribe({
        next: () => {
          this.passwordDto = {};
          this.resetRequirements();
          this.messageService.showSuccessByCode('NOTIFICATION.PASSWORD_CHANGE.SUCCESS');
        },
        error: (err: HttpErrorResponse) => {
          this.displayErrorHelper.displayErrorFunc(err);
          this.messageService.showErrorByCode('NOTIFICATION.PASSWORD_CHANGE.ERROR');
        },
      })
      .add(() => this.setIsBusy(false));
  }

  public validatePassword(): void {
    if (!this.passwordDto.newPassword) {
      return;
    }

    this.requirements.hasUppercase = /[A-Z]/.test(this.passwordDto.newPassword!);
    this.requirements.hasNumber = /\d/.test(this.passwordDto.newPassword!);
    this.requirements.hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(this.passwordDto.newPassword!);
    this.requirements.isValidLength = this.passwordDto.newPassword!.length >= 8;
  }

  public resetRequirements(): void {
    this.requirements = {
      hasUppercase: false,
      hasNumber: false,
      hasSpecialChar: false,
      isValidLength: false,
    };
  }

  private setIsBusy(isBusy: boolean): void {
    this.isBusy = isBusy;
    this.pageSpinnerService.changeState(isBusy);
  }
}
