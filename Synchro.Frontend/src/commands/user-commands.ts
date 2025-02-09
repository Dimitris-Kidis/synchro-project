import { RoleEnum } from '../app/enums/role.enum';

export interface UpdateUserCommand {
  id?: string;
  firstName?: string;
  lastName?: string;
  age?: number;
}

export interface UpdateUserRoleCommand {
  id?: string;
  role: RoleEnum;
}
