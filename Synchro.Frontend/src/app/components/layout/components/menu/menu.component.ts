import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ThemeService } from '../../../../../services/theme.service';
import { MenuService } from '../../services/menu.service';
import { IMenuSection, IMenuSubItem } from '../menu-item/menu-item';
import { MenuItemComponent } from '../menu-item/menu-item.component';
import { MenuSchema } from './menu.schema';

@Component({
  selector: 'synchro-menu',
  standalone: true,
  imports: [CommonModule, MenuItemComponent, TranslateModule, MatToolbarModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent implements OnInit {
  public menuSections: IMenuSection[];
  public menuSubItem: IMenuSubItem | undefined;

  public themeService: ThemeService = inject(ThemeService);

  public constructor(public menuService: MenuService, private readonly router: Router) {
    this.menuSections = Object.values(MenuSchema);
  }

  public ngOnInit(): void {
    const currentPath = this.getCurrentPath();

    if (currentPath) {
      this.findActiveSubItem(currentPath);
    }
  }

  public findActiveSubItem(currentPath: string): void {
    this.menuSections.forEach((section) => {
      section.sectionItems.forEach((item) => {
        if (item.subItems) {
          const foundSubItem = item.subItems.find((subItem) => subItem.navigationPath === currentPath);
          if (foundSubItem) {
            foundSubItem.isActive = true;
            return;
          }
        }
      });
    });
  }

  public resetAll(): void {
    this.menuSections.forEach((section) =>
      section.sectionItems.forEach((item) => {
        item.isActive = false;

        item.subItems?.forEach((subItem) => (subItem.isActive = false));
      }),
    );
  }

  private getCurrentPath(): string {
    const fullPath = this.router.routerState.snapshot.url;
    const pathSegments = fullPath.split('/');

    return pathSegments[2];
  }
}
