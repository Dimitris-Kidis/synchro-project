import { HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { IPaginatorResult, ISearchPaginatedRequest } from '../../../models/common';
import { WebContentDto } from '../../../models/web-content';
import { WebContentsService } from '../../../services/web-content.service';
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
import { PostEditComponent } from './post-edit/post-edit.component';
import { PostViewComponent } from './post-view/post-view.component';

@Component({
  selector: 'synchro-feed',
  standalone: true,
  imports: [
    EmptyListComponent,
    FormsModule,
    MatIconModule,
    PostEditComponent,
    PostViewComponent,
    TextEditControlComponent,
    TranslateModule,
  ],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss',
})
export class FeedComponent implements OnInit {
  public currentPost: WebContentDto = {};
  public webContents: WebContentDto[] = [];

  public isBusy: boolean = false;
  public isEditMode: boolean = false;
  public isCreateMode: boolean = true;

  public totalCount: number = 0;
  public hasMore: boolean = false;
  public queryFilters: ISearchPaginatedRequest = { paginatedRequest: { pageIndex: 1, pageSize: 30 } };

  public config: ISearchConfig = getSearchConfig();
  public schema: ISearchSchema = getSearchSchema('FEED.SEARCH.PLACEHOLDER');

  public constructor(
    private readonly webContentsService: WebContentsService,
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

  public createPost(): void {
    this.isEditMode = true;
    this.isCreateMode = true;
    this.currentPost = {};
  }

  public editPost(post: WebContentDto): void {
    this.isEditMode = true;
    this.isCreateMode = false;
    this.currentPost = post;
  }

  public refreshPostsList(): void {
    this.isEditMode = false;
    this.resetSearch();
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
    this.webContents = [];
  }

  private setIsBusy(isBusy: boolean): void {
    this.isBusy = isBusy;
    this.pageSpinnerService.changeState(isBusy);
  }
}
