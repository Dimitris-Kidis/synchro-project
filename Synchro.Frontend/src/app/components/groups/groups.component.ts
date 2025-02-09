import { HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { IPaginatorResult, ISearchPaginatedRequest } from '../../../models/common';
import { GroupDto } from '../../../models/groups';
import { GroupsService } from '../../../services/groups.service';
import { PageSpinnerService } from '../../common/components/page-spinner/page-spinner.service';
import { TextEditControlComponent } from '../../common/controls/text-edit-control/text-edit-control.component';
import { DisplayErrorHelper } from '../../common/helpers/display-error.helper';
import { GroupCardComponent } from './group-card/group-card.component';
import { IGroupsConfig, getGroupsConfig } from './groups.config';
import { IGroupsSchema, getGroupsSchema } from './groups.schema';

@Component({
  selector: 'synchro-groups',
  standalone: true,
  imports: [TextEditControlComponent, FormsModule, MatIconModule, TranslateModule, GroupCardComponent],
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.scss',
})
export class GroupsComponent implements OnInit {
  public searchInput: string = '';
  public isBusy: boolean = false;

  public totalCount: number = 0;
  public hasMore: boolean = false;
  public groups: GroupDto[] = [];
  public queryFilters: ISearchPaginatedRequest = { paginatedRequest: { pageIndex: 1, pageSize: 30 } };

  public config: IGroupsConfig = getGroupsConfig();
  public schema: IGroupsSchema = getGroupsSchema();

  public constructor(
    private readonly groupsService: GroupsService,
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

  private load(): void {
    this.setIsBusy(true);

    this.groupsService
      .getGroupsPaginated(this.queryFilters)
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (result: IPaginatorResult<GroupDto>) => {
          this.groups = [...this.groups, ...result.items];
          this.hasMore = result.hasMore;
          this.totalCount = result.total;

          console.log(this.groups);
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
    this.groups = [];
  }

  private setIsBusy(isBusy: boolean): void {
    this.isBusy = isBusy;
    this.pageSpinnerService.changeState(isBusy);
  }
}
