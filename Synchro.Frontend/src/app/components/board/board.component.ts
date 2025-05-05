import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { WorkItemDto } from '../../../models/work-item';
import { CurrentUserProvider } from '../../../providers/current-user.provider';
import { WorkItemsService } from '../../../services/work-items.service';
import { PageSpinnerService } from '../../common/components/page-spinner/page-spinner.service';
import { DisplayErrorHelper } from '../../common/helpers/display-error.helper';
import { PriorityTypeEnum } from '../../enums/priority-type.enum';
import { WorkItemStatusTypeEnum } from '../../enums/status-type.enum';
import { WorkItemTypeEnum } from '../../enums/work-item-type.enum';
import { EnumNamePipe } from '../../pipes/enum-name.pipe';
import { TaskCardComponent } from './task-card/task-card.component';
import { TaskEditComponent } from './task-edit/task-edit.component';

export interface Column {
  title: WorkItemStatusTypeEnum;
  status: WorkItemStatusTypeEnum;
  workItems: WorkItemDto[];
}

@Component({
  selector: 'synchro-board',
  standalone: true,
  imports: [
    DragDropModule,
    CommonModule,
    CdkDrag,
    CdkDropList,
    MatIconModule,
    FontAwesomeModule,
    EnumNamePipe,
    TaskCardComponent,
    MatDialogModule,
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent implements OnInit {
  public WorkItemStatusTypeEnum = WorkItemStatusTypeEnum;

  public isBusy: boolean = false;

  public groupId: string;
  public userId: string;
  public columns: Column[] = [
    {
      title: WorkItemStatusTypeEnum.New,
      status: WorkItemStatusTypeEnum.New,
      workItems: [],
    },
    {
      title: WorkItemStatusTypeEnum.Active,
      status: WorkItemStatusTypeEnum.Active,
      workItems: [],
    },
    {
      title: WorkItemStatusTypeEnum.Resolved,
      status: WorkItemStatusTypeEnum.Resolved,
      workItems: [],
    },
    {
      title: WorkItemStatusTypeEnum.Closed,
      status: WorkItemStatusTypeEnum.Closed,
      workItems: [],
    },
  ];

  public constructor(
    private readonly workItemsService: WorkItemsService,
    private readonly currentUserProvider: CurrentUserProvider,
    private readonly pageSpinnerService: PageSpinnerService,
    private readonly displayErrorHelper: DisplayErrorHelper,
    private readonly dialog: MatDialog,
  ) {
    this.groupId = this.currentUserProvider.currentUser.groupId!;
    this.userId = this.currentUserProvider.currentUser.id!;
  }

  public ngOnInit(): void {
    this.loadItems();
    // this.editTask('797fec62-b5d1-4813-f0fe-08dd8b0719c2');
  }

  public addNewTask(): void {
    const newTask: WorkItemDto = {
      title: 'New Task',
      assignee: 'Unassigned',
      userId: this.userId,
      groupId: this.groupId,
      priority: PriorityTypeEnum.Low,
      status: WorkItemStatusTypeEnum.New,
      type: WorkItemTypeEnum.Story,
    };

    this.setIsBusy(true);

    this.workItemsService
      .createWorkItem(newTask)
      .subscribe({
        next: (workItem: WorkItemDto) => {
          newTask.id = workItem.id;
          newTask.createdBy = workItem.createdBy;
          newTask.assigneeAvatar = workItem.assigneeAvatar;
          newTask.assignee = workItem.assignee;
          this.columns[0].workItems.push(newTask);
        },
        error: (err: HttpErrorResponse) => {
          this.displayErrorHelper.displayErrorFunc(err);
        },
      })
      .add(() => this.setIsBusy(false));
  }

  public onDrop(event: CdkDragDrop<WorkItemDto[]>, targetStatus: WorkItemStatusTypeEnum): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);

      event.item.data.status = targetStatus;
      this.updateStatus(event.item.data, targetStatus);
    }
  }

  public updateStatus(workItem: WorkItemDto, newStatus: WorkItemStatusTypeEnum): void {
    this.workItemsService.updateWorkItemStatus({ id: workItem.id, status: newStatus }).subscribe({
      next: () => {},
      error: (err: HttpErrorResponse) => {
        this.displayErrorHelper.displayErrorFunc(err);
      },
    });
  }

  public editTask(task: WorkItemDto): void {
    const dialogRef = this.dialog.open(TaskEditComponent, {
      autoFocus: false,
      panelClass: 'calendar-event-modal',
      disableClose: false,
      closeOnNavigation: true,
      data: {
        task,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      const { hasToRefresh } = result;

      if (hasToRefresh) {
        this.loadItems();
      }
    });
  }

  public deleteTask(taskId: string): void {
    this.workItemsService.deleteWorkItem(taskId).subscribe({
      next: () => {
        this.loadItems();
      },
      error: (err: HttpErrorResponse) => {
        this.displayErrorHelper.displayErrorFunc(err);
      },
    });
  }

  public filterWorkItems(data: WorkItemDto[]): void {
    this.columns.forEach((column) => (column.workItems = []));

    data.forEach((item) => {
      const targetColumn = this.columns.find((column) => column.status === item.status);
      if (targetColumn) {
        targetColumn.workItems.push(item);
      }
    });
  }

  public openTask(taskId: string): void {
    console.log('open -> ', taskId);
  }

  private setIsBusy(isBusy: boolean): void {
    this.isBusy = isBusy;
    this.pageSpinnerService.changeState(isBusy);
  }

  private loadItems(): void {
    this.setIsBusy(true);

    this.workItemsService
      .getMyGroupWorkItems(this.groupId)
      .subscribe({
        next: (workItems: WorkItemDto[]) => {
          this.filterWorkItems(workItems);
        },
        error: (err: HttpErrorResponse) => {
          this.displayErrorHelper.displayErrorFunc(err);
        },
      })
      .add(() => this.setIsBusy(false));
  }
}
