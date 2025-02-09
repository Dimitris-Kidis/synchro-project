import { Component, OnInit } from '@angular/core';
import { User } from '../../../../../models/user';
import { CurrentUserProvider } from '../../../../../providers/current-user.provider';
import { ImageSizeEnum } from '../../../../enums/image-size.enum';
import { LanguageTogglerComponent } from '../../../language-toggler/language-toggler.component';
import { ThemeSwitchComponent } from '../../../theme-switch/theme-switch.component';
import { UserAvatarComponent } from '../../../user-avatar/user-avatar.component';
import { NotificationBellComponent } from '../notification-bell/notification-bell.component';

@Component({
  selector: 'synchro-layout-header',
  standalone: true,
  imports: [LanguageTogglerComponent, UserAvatarComponent, NotificationBellComponent, ThemeSwitchComponent],
  templateUrl: './layout-header.component.html',
  styleUrl: './layout-header.component.scss',
})
export class LayoutHeaderComponent implements OnInit {
  public ImageSizeEnum = ImageSizeEnum;
  public user: User | null;

  public constructor(private readonly currentUserProvider: CurrentUserProvider) {}

  public ngOnInit(): void {
    this.user = this.currentUserProvider.currentUserSig();
  }

  public openNotifications(): void {}
}
