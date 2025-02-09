import { HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { IPaginatorResult, ISearchPaginatedRequest } from '../../../models/common';
import { WebContentDto } from '../../../models/web-content';
import { WebContentsService } from '../../../services/web-content.service';
import { PageSpinnerService } from '../../common/components/page-spinner/page-spinner.service';
import { DisplayErrorHelper } from '../../common/helpers/display-error.helper';
import { EmptyListComponent } from '../empty-list/empty-list.component';
import { PostViewComponent } from '../feed/post-view/post-view.component';
import { LanguageTogglerComponent } from '../language-toggler/language-toggler.component';
import { ToggleSwitchComponent } from '../toggle-switch/toggle-switch.component';

@Component({
  selector: 'synchro-dashboard',
  standalone: true,
  imports: [LanguageTogglerComponent, ToggleSwitchComponent, PostViewComponent, EmptyListComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  public isBusy: boolean = false;

  public webContents: WebContentDto[] = [];
  public queryFilters: ISearchPaginatedRequest = { paginatedRequest: { pageIndex: 1, pageSize: 30 } };

  public constructor(
    private readonly webContentsService: WebContentsService,
    private readonly pageSpinnerService: PageSpinnerService,
    private readonly displayErrorHelper: DisplayErrorHelper,
    private readonly destroyRef: DestroyRef,
  ) {}

  public ngOnInit(): void {
    this.load();
  }

  private load(): void {
    this.setIsBusy(true);

    this.webContentsService
      .getPostsPaginated(this.queryFilters)
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (result: IPaginatorResult<WebContentDto>) => {
          this.webContents = [...this.webContents, ...result.items];
        },
        error: (err: HttpErrorResponse) => {
          this.displayErrorHelper.displayErrorFunc(err);
        },
      })
      .add(() => {
        this.setIsBusy(false);
      });
  }

  private setIsBusy(isBusy: boolean): void {
    this.isBusy = isBusy;
    this.pageSpinnerService.changeState(isBusy);
  }
}
