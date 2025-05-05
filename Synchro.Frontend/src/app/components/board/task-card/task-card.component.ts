import { CommonModule, NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { User } from '../../../../models/user';
import { WorkItemDto } from '../../../../models/work-item';
import { ImageSizeEnum } from '../../../enums/image-size.enum';
import { WorkItemStateTypeEnum } from '../../../enums/state-type.enum';
import { WorkItemTypeEnum } from '../../../enums/work-item-type.enum';
import { DefaultValuePipe } from '../../../pipes/default-value.pipe';
import { TagsComponent } from '../../tags/tags.component';
import { UserAvatarComponent } from '../../user-avatar/user-avatar.component';

@Component({
  selector: 'synchro-task-card',
  imports: [CommonModule, NgClass, MatIconModule, TagsComponent, UserAvatarComponent, DefaultValuePipe],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss',
})
export class TaskCardComponent {
  @Input() public task: WorkItemDto;
  @Output() public onTaskDelete = new EventEmitter<string>();
  @Output() public onTaskEdit = new EventEmitter<WorkItemDto>();

  public WorkItemStateTypeEnum = WorkItemStateTypeEnum;
  public ImageSizeEnum = ImageSizeEnum;

  public WorkItemTypeEnum = WorkItemTypeEnum;

  public editTask(task: WorkItemDto): void {
    this.onTaskEdit.emit(task);
  }

  public deleteTask(taskId: string): void {
    this.onTaskDelete.emit(taskId);
  }

  public mapUser(userNames: string[], userAvatar?: string | null): User {
    return {
      firstName: userNames[0],
      lastName: userNames[1],
      image: userAvatar,
    };
  }

  public getIconName(type: WorkItemTypeEnum): string {
    return WorkItemTypeEnum[type].toLowerCase() + '-icon';
  }
}
