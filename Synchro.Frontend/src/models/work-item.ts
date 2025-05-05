import { PriorityTypeEnum } from '../app/enums/priority-type.enum';
import { WorkItemStateTypeEnum } from '../app/enums/state-type.enum';
import { WorkItemStatusTypeEnum } from '../app/enums/status-type.enum';
import { WorkItemTypeEnum } from '../app/enums/work-item-type.enum';

export interface WorkItemDto {
  id?: string;
  title?: string;
  description?: string;
  assignee?: string;
  assigneeAvatar?: string;
  isDeleted?: boolean;
  isModified?: boolean;
  isArchived?: boolean;
  priority?: PriorityTypeEnum;
  type?: WorkItemTypeEnum;
  status?: WorkItemStatusTypeEnum;
  state?: WorkItemStateTypeEnum;
  tags?: string[];
  groupId?: string;
  userId?: string;
  createdBy?: string;
  lastModifiedBy?: string;
  createdAt?: Date;
  lastModifiedAt?: Date;
}
