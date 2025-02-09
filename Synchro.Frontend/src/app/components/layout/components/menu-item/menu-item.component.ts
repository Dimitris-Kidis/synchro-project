import { animate, style, transition, trigger } from '@angular/animations';
import { OverlayModule } from '@angular/cdk/overlay';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StoreModule } from '@ngrx/store';
import { CurrentUserProvider } from '../../../../../providers/current-user.provider';
import { PageSpinnerModule } from '../../../../common/components/page-spinner/page-spinner.module';
import { RoleEnum } from '../../../../enums/role.enum';
import { IconsModule } from '../../../../icons/icons.module';
import { SharedModule } from '../../../../shared/shared.module';
import { IMenuItem, IMenuSection, IMenuSubItem } from './menu-item';

@Component({
  selector: 'synchro-menu-item',
  standalone: true,
  imports: [
    SharedModule,
    RouterModule,

    MatIconModule,
    FontAwesomeModule,
    IconsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatButtonModule,
    OverlayModule,

    PageSpinnerModule,
    StoreModule,
  ],
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.scss',
  animations: [
    trigger('expandCollapse', [
      transition(':enter', [
        style({ height: '0', overflow: 'hidden' }),
        animate('300ms ease-out', style({ height: '*' })),
      ]),
      transition(':leave', [
        style({ height: '*', overflow: 'hidden' }),
        animate('300ms ease-in', style({ height: '0' })),
      ]),
    ]),
  ],
})
export class MenuItemComponent implements OnInit {
  @Input() public menuSection!: IMenuSection;
  @Output() public deactivateAll = new EventEmitter<void>();

  public collapsedItems: Record<string, boolean> = {};
  public activeItemKey: string | null = null;
  public userHasGroup: boolean;
  public userRole: RoleEnum;

  private readonly COLLAPSED_IF_NO_GROUP: string[] = ['MENU.ITEM.MY_GROUP', 'MENU.ITEM.MY_PROJECT'];

  private readonly STORAGE_KEY: string = 'menuState';

  public constructor(private readonly currentUserProvider: CurrentUserProvider) {}
  public ngOnInit(): void {
    this.userHasGroup = this.currentUserProvider.hasGroup();
    this.userRole = this.currentUserProvider.currentUserRole;

    this.loadState();

    if (Object.keys(this.collapsedItems).length === 0) {
      this.menuSection.sectionItems.forEach((item) => {
        const key = this.getMenuItemKey(item);
        this.collapsedItems[key] = true;
      });
    }
  }

  public toggleCollapse(item: IMenuItem, hasToStopCollapse: boolean = false): void {
    if (hasToStopCollapse) {
      return;
    }

    const key = this.getMenuItemKey(item);
    this.collapsedItems[key] = !this.collapsedItems[key];

    if (!item.subItems) {
      this.deactivateAll.emit();
    }

    this.saveState();
  }

  public hasSubItems(item: IMenuItem): boolean {
    return !!(item.subItems && item.subItems.length > 0);
  }

  public isCollapsed(item: IMenuItem): boolean {
    const key = this.getMenuItemKey(item);
    return this.collapsedItems[key];
  }

  public isActive(item: IMenuSubItem): boolean {
    return this.activeItemKey === item.subItemNameTranslationKey;
  }

  public setActive(subItem: IMenuSubItem): void {
    this.deactivateAll.emit();
    subItem.isActive = true;
  }

  public isTooltipDisabled(item: IMenuItem): boolean {
    return item.hasToHaveGroup ? item.hasToHaveGroup === this.userHasGroup : true;
  }

  public getRouterLink(item: IMenuItem): string[] | [] {
    if (!item.subItems) {
      return item.hasToHaveGroup && item.hasToHaveGroup !== this.userHasGroup ? [] : [item.navigationPath!];
    }

    if (item.subItems && item.hasToHaveGroup && this.userHasGroup === false && item.navigationPath) {
      return [item.navigationPath!];
    }

    return [];
  }

  public getItemTitle(item: IMenuItem): string {
    return item.hasToHaveGroup && this.userHasGroup === false
      ? item.alternativeItemNameTranslationKey || item.itemNameTranslationKey
      : item.itemNameTranslationKey;
  }

  private getMenuItemKey(item: IMenuItem): string {
    return item.itemNameTranslationKey || item.alternativeItemNameTranslationKey || '';
  }

  private saveState(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.collapsedItems));
  }

  private loadState(): void {
    const storedState = localStorage.getItem(this.STORAGE_KEY);
    if (storedState) {
      this.collapsedItems = JSON.parse(storedState);

      if (!this.userHasGroup) {
        this.COLLAPSED_IF_NO_GROUP.forEach((key) => {
          this.collapsedItems[key] = true;
        });
      }
    }
  }
}
