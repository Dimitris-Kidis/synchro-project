import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { CreateRequestCommand } from '../../../../commands/requests-commands';
import { environment } from '../../../../environment/environment';
import { User } from '../../../../models/user';
import { CurrentUserProvider } from '../../../../providers/current-user.provider';
import { MessageService } from '../../../../services/message.service';
import { RequestsService } from '../../../../services/requests.service';
import { UsersService } from '../../../../services/users.service';
import { PageSpinnerModule } from '../../../common/components/page-spinner/page-spinner.module';
import { PageSpinnerService } from '../../../common/components/page-spinner/page-spinner.service';
import { DisplayErrorHelper } from '../../../common/helpers/display-error.helper';
import { ClickOutsideDirective } from '../../../directives/click-outside/click-outside.directive';
import { ImageSizeEnum } from '../../../enums/image-size.enum';
import { RequestTypeEnum } from '../../../enums/requests.enum';
import { RoleEnum } from '../../../enums/role.enum';
import { RoleNamePipe } from '../../../pipes/role-name.pipe';
import { UserAvatarComponent } from '../../user-avatar/user-avatar.component';

interface DropdownOption {
  key: number;
  label: string;
}

@Component({
  selector: 'synchro-profile-view',
  standalone: true,
  imports: [
    UserAvatarComponent,
    CommonModule,
    FormsModule,
    MatIconModule,
    PageSpinnerModule,
    RoleNamePipe,
    TranslateModule,
    ClickOutsideDirective,
  ],
  templateUrl: './profile-view.component.html',
  styleUrl: './profile-view.component.scss',
  animations: [
    trigger('rotate', [
      transition('void=>*', [style({ transform: 'rotate(0)' })]),
      transition('* => *', [
        style({ transform: 'rotate(0)' }),
        animate('650ms', style({ transform: 'rotate(360deg)' })),
      ]),
    ]),
  ],
})
export class ProfileViewComponent {
  @Output() public setEditMode = new EventEmitter<boolean>();
  @Input() public options: DropdownOption[] = [{ key: RequestTypeEnum.BecomeAdmin, label: 'REQUEST.BECOME_ADMIN' }];
  @Input({ required: true }) public user: User = {};
  public ImageSizeEnum = ImageSizeEnum;
  public RoleEnum = RoleEnum;

  public isDropdownOpen = false;
  public isBusy: boolean = false;
  public isKeyLoading: boolean = false;
  public isSecretVisible: boolean = false;
  public maskedSecretKey: string = environment.secretKeyHiddenFormat;

  public requestText: string;
  public selectedOption: DropdownOption | null = null;

  public constructor(
    private readonly usersService: UsersService,
    private readonly displayErrorHelper: DisplayErrorHelper,
    private readonly pageSpinnerService: PageSpinnerService,
    private readonly messageService: MessageService,
    private readonly currentUserProvider: CurrentUserProvider,
    private readonly requestsService: RequestsService,
  ) {
    const isManager: boolean = currentUserProvider.currentUser.role === RoleEnum.Manager;

    if (!isManager) {
      this.options.push({ key: RequestTypeEnum.BecomeManager, label: 'REQUEST.BECOME_MANAGER' });
    }
  }

  public toggleSecretVisibility(): void {
    this.isSecretVisible = !this.isSecretVisible;

    if (this.isSecretVisible) {
      setTimeout(() => {
        this.isSecretVisible = false;
      }, 5000);
    }
  }

  public regenerateKey(): void {
    this.isKeyLoading = true;
    this.isSecretVisible = false;

    this.usersService
      .regenerateSecretKey()
      .subscribe({
        next: (newKey: string) => {
          this.user.secretKey = newKey;
          this.messageService.showSuccessByCode('NOTIFICATION.KEY.REGENERATED.SUCCESS');
        },
        error: (err: HttpErrorResponse) => {
          this.displayErrorHelper.displayErrorFunc(err);
        },
      })
      .add(() => (this.isKeyLoading = false));
  }

  public edit(): void {
    this.setEditMode.emit(true);
  }

  public toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  public selectOption(option: DropdownOption): void {
    this.selectedOption = option;
    this.isDropdownOpen = false;
  }

  public closeDropdown(): void {
    this.isDropdownOpen = false;
  }

  public sendRequest(): void {
    if (!this.selectedOption) {
      return;
    }

    const command: CreateRequestCommand = {
      type: this.selectedOption.key,
      senderId: this.currentUserProvider.currentUser.id!,
      text: this.requestText,
      senderName: this.currentUserProvider.currentUser.firstName + ' ' + this.currentUserProvider.currentUser.lastName,
    };

    this.setIsBusy(true);

    this.requestsService
      .createRequest(command)
      .subscribe({
        next: () => {
          this.messageService.showSuccessByCode('NOTIFICATION.REQUEST.HAS_BEEN_SENT');
          this.selectedOption = null;
          this.requestText = '';
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
