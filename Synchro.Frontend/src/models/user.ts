import { RoleEnum } from '../app/enums/role.enum';

export interface User {
  id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  age?: number;
  image?: string | null;
  secretKey?: string;
  role?: RoleEnum;
  groupId?: string;
}

export interface GetUserSearchQueryDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  image?: string;
  role: RoleEnum;
  createdAt: string;
  groupInfo: GetUserSearchGroupInfoQueryDto;
}

export interface GetUserSearchGroupInfoQueryDto {
  id: string;
  name?: string;
  description?: string;
  image?: string;
  code?: string;
}
