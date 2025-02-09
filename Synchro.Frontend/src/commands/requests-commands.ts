import { RequestStatusEnum } from '../app/enums/request-status.enum';
import { RequestTypeEnum } from '../app/enums/requests.enum';

export interface CreateRequestCommand {
  senderId: string;
  senderName: string;
  text?: string | null;
  type: RequestTypeEnum;
  groupId?: string | null;
}

export interface RequestDto {
  id: string;
  text?: string;
  type: RequestTypeEnum;
  status: RequestStatusEnum;
  approver?: string;
  isApproved?: boolean;
  senderId: string;
  recipientId?: string;
  groupId?: string;
  senderName: string;
  recipientName?: string;
  groupName?: string;
  createdAt: string;
}

export interface UpdateRequestCommand {
  id: string;
  isApproved: boolean;
}
