import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MenuSchema } from '../components/menu/menu.schema';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  public collapsedItem$: Observable<MenuSchema | null>;
  public minimizedMode$: Observable<boolean>;

  private collapsedItem = new BehaviorSubject<MenuSchema | null>(null);
  private minimizedMode = new BehaviorSubject<boolean>(false);

  public constructor() {
    this.collapsedItem$ = this.collapsedItem;
    this.minimizedMode$ = this.minimizedMode;
  }

  public get isMinimizedMode(): boolean {
    return this.minimizedMode.value;
  }

  public toggleMenuItem(mainMenu: MenuSchema): void {
    if (mainMenu === this.collapsedItem.value) {
      this.collapsedItem.next(null);
    } else {
      this.collapsedItem.next(mainMenu);
    }
  }

  public toggleMinimizedMode(): void {
    this.minimizedMode.next(!this.minimizedMode.value);
  }
}
