import { HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { IPaginatorResult, ISearchPaginatedRequest } from '../../../models/common';
import { WikiPageDto } from '../../../models/wiki-page';
import { CurrentUserProvider } from '../../../providers/current-user.provider';
import { WikiPagesService } from '../../../services/wiki-pages.service';
import { PageSpinnerService } from '../../common/components/page-spinner/page-spinner.service';
import {
  ISearchConfig,
  ISearchSchema,
  getSearchConfig,
  getSearchSchema,
} from '../../common/configs and schemas/search.cas';
import { TextEditControlComponent } from '../../common/controls/text-edit-control/text-edit-control.component';
import { DisplayErrorHelper } from '../../common/helpers/display-error.helper';
import { EmptyListComponent } from '../empty-list/empty-list.component';
import { WikiEditComponent } from './wiki-edit/wiki-edit.component';
import { WikiViewComponent } from './wiki-view/wiki-view.component';

@Component({
  selector: 'synchro-wiki',
  standalone: true,
  imports: [
    EmptyListComponent,
    FormsModule,
    MatIconModule,
    TextEditControlComponent,
    TranslateModule,
    WikiViewComponent,
    WikiEditComponent,
  ],
  templateUrl: './wiki.component.html',
  styleUrl: './wiki.component.scss',
})
export class WikiComponent implements OnInit {
  public currentWikiPage: WikiPageDto = {};
  public wikiPages: WikiPageDto[] = [];

  public isBusy: boolean = false;
  public isEditMode: boolean = false;
  public isCreateMode: boolean = true;

  public totalCount: number = 0;
  public hasMore: boolean = false;
  public queryFilters: ISearchPaginatedRequest = { paginatedRequest: { pageIndex: 1, pageSize: 30 } };

  public config: ISearchConfig = getSearchConfig();
  public schema: ISearchSchema = getSearchSchema('WIKI.SEARCH.PLACEHOLDER');

  public constructor(
    private readonly wikiPagesService: WikiPagesService,
    private readonly currentUserProvider: CurrentUserProvider,
    private readonly pageSpinnerService: PageSpinnerService,
    private readonly displayErrorHelper: DisplayErrorHelper,
    private readonly destroyRef: DestroyRef,
  ) {}

  public ngOnInit(): void {
    this.load();
  }

  public refresh(): void {
    this.resetSearch();
    this.load();
  }

  public search(): void {
    this.resetSearch();
    this.load();
  }

  public createWikiPage(): void {
    this.isEditMode = true;
    this.isCreateMode = true;
    this.currentWikiPage = { groupId: this.currentUserProvider.currentUser.groupId! };
  }

  public editWikiPage(page: WikiPageDto): void {
    this.isEditMode = true;
    this.isCreateMode = false;
    this.currentWikiPage = page;
  }

  public refreshWikiPagesList(): void {
    this.isEditMode = false;
    this.resetSearch();
    this.load();
  }

  private load(): void {
    this.setIsBusy(true);

    this.wikiPagesService
      .getWikiPagesPaginated(this.queryFilters)
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (result: IPaginatorResult<WikiPageDto>) => {
          this.wikiPages = [...this.wikiPages, ...result.items];
          this.hasMore = result.hasMore;
          this.totalCount = result.total;
        },
        error: (err: HttpErrorResponse) => {
          this.displayErrorHelper.displayErrorFunc(err);
        },
      })
      .add(() => {
        this.setIsBusy(false);
      });
  }

  private resetSearch(): void {
    this.queryFilters.paginatedRequest.pageIndex = 1;
    this.wikiPages = [];
  }

  private setIsBusy(isBusy: boolean): void {
    this.isBusy = isBusy;
    this.pageSpinnerService.changeState(isBusy);
  }
}
