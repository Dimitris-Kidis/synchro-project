import { Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { User } from '../../../models/user';
import { CurrentUserProvider } from '../../../providers/current-user.provider';
import { ThemeService } from '../../../services/theme.service';
import { NgOnDestroy } from '../../common/services/ng-on-destroy.service';
import { PageTitleService } from '../../common/services/page-title.service';

@Component({
  selector: 'synchro-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  standalone: false,
  encapsulation: ViewEncapsulation.None,
  providers: [NgOnDestroy],
})
export class LayoutComponent implements OnInit {
  public user: User | null;

  public themeService: ThemeService = inject(ThemeService);

  public constructor(
    public readonly pageTitleService: PageTitleService,
    public readonly currentUserProvider: CurrentUserProvider,
  ) {}

  public ngOnInit(): void {
    this.user = this.currentUserProvider.currentUserSig();
  }
}
