import { RoleEnum } from '../app/enums/role.enum';

export interface GroupDto {
  id?: string;
  name?: string;
  description?: string;
  image?: string | null;
  code?: string;
  canJoin?: boolean;
  hasManager?: boolean;
  isApprovedToBeCreated?: boolean;
  isDeleted?: boolean;
  participantsNumber?: number;
  participantsLimitNumber?: number;
  createdBy?: string;
  createdAt?: string;
  lastModifiedBy?: string;
  lastModifiedAt?: string;
}

export interface GroupUserDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  image?: string | null;
  role: RoleEnum;
  createdAt: string;
}
