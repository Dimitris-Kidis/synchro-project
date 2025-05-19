import { CommonModule, NgClass } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { QuillModule } from 'ngx-quill';
import { User } from '../../../../models/user';
import { WorkItemDto } from '../../../../models/work-item';
import { WorkItemsService } from '../../../../services/work-items.service';
import { PageSpinnerService } from '../../../common/components/page-spinner/page-spinner.service';
import { ComboEditControlComponent } from '../../../common/controls/combo-edit-control/combo-edit-control.component';
import { TextEditControlComponent } from '../../../common/controls/text-edit-control/text-edit-control.component';
import { DisplayErrorHelper } from '../../../common/helpers/display-error.helper';
import { ImageSizeEnum } from '../../../enums/image-size.enum';
import { WorkItemTypeEnum } from '../../../enums/work-item-type.enum';
import { DefaultValuePipe } from '../../../pipes/default-value.pipe';
import { TagsComponent } from '../../tags/tags.component';
import { EditorConfig } from '../../text-editor/editor.config';
import { UserAvatarComponent } from '../../user-avatar/user-avatar.component';
import { ITaskEditConfig, getTaskEditConfig } from './task-edit.config';
import { TaskEditQuillConfig } from './task-edit.quill';
import { ITaskEditSchema, getTaskEditSchema } from './task-edit.schema';

@Component({
  selector: 'synchro-task-edit',
  imports: [
    TranslateModule,
    FormsModule,
    TextEditControlComponent,
    ComboEditControlComponent,
    QuillModule,
    CommonModule,
    CommonModule,
    NgClass,
    MatIconModule,
    TagsComponent,
    UserAvatarComponent,
    DefaultValuePipe,
  ],
  templateUrl: './task-edit.component.html',
  styleUrl: './task-edit.component.scss',
})
export class TaskEditComponent implements OnInit, AfterViewInit {
  public isBusy: boolean = false;
  public quillConfig: EditorConfig = TaskEditQuillConfig.config;

  public WorkItemTypeEnum = WorkItemTypeEnum;
  public ImageSizeEnum = ImageSizeEnum;

  public tags: string[] = [];
  public task: WorkItemDto = {};

  public config: ITaskEditConfig = getTaskEditConfig();
  public schema: ITaskEditSchema = getTaskEditSchema();

  public constructor(
    @Inject(MAT_DIALOG_DATA) public readonly data: any,
    public dialogRef: MatDialogRef<TaskEditComponent>,
    private readonly workItemsService: WorkItemsService,
    private readonly pageSpinnerService: PageSpinnerService,
    private readonly displayErrorHelper: DisplayErrorHelper,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  public ngOnInit(): void {
    if (!this.data.task) {
      return;
    }

    this.task = this.data.task;

    // this.setIsBusy(true);

    // this.workItemsService
    //   .getWorkItem(this.data.id)
    //   .subscribe({
    //     next: (task: WorkItemDto) => {
    //       this.task = task;
    //       this.cdr.detectChanges();
    //     },
    //     error: (err: HttpErrorResponse) => {
    //       this.displayErrorHelper.displayErrorFunc(err);
    //     },
    //   })
    //   .add(() => {
    //     this.setIsBusy(false);
    //   });
  }

  public ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  public save(): void {
    this.setIsBusy(true);

    this.workItemsService
      .updateWorkItem(this.task)
      .subscribe({
        next: () => {
          this.dialogRef.close({ hasToRefresh: true });
        },
        error: (err) => this.displayErrorHelper.displayErrorFunc(err),
      })
      .add(() => this.setIsBusy(false));
  }

  public mapUser(userNames: string[], userAvatar?: string | null): User {
    return {
      firstName: userNames[0],
      lastName: userNames[1],
      image: userAvatar,
    };
  }

  public cancel(): void {
    this.dialogRef.close();
  }

  public getIconName(type: WorkItemTypeEnum): string {
    if (type === undefined || WorkItemTypeEnum[type] === undefined) {
      return 'story-icon';
    }

    return WorkItemTypeEnum[type].toLowerCase() + '-icon';
  }

  public refreshTags(tags: string[]): void {
    this.task.tags = tags;
    this.tags = tags;
  }
  private setIsBusy(isBusy: boolean): void {
    this.isBusy = isBusy;
    this.pageSpinnerService.changeState(isBusy);
  }
}
