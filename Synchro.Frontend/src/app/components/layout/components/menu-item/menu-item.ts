import { RoleEnum } from '../../../../enums/role.enum';

export interface IMenuSection {
  sectionTranslationKey?: string;
  sectionItems: IMenuItem[];
  allowedUserRoles?: RoleEnum[];
}

export interface IMenuItem {
  itemNameTranslationKey: string;
  itemIcon: string;
  navigationPath?: string;
  alternativeItemNameTranslationKey?: string;
  isActive?: boolean;
  prefixNavigationPath?: string;
  allowedUserRoles?: RoleEnum[];
  hasToHaveGroup?: boolean;
  subItems?: IMenuSubItem[];
  tooltipMessageTranslationKey?: string;
}

export interface IMenuSubItem {
  subItemNameTranslationKey: string;
  navigationPath?: string;
  isActive?: boolean;
  hasToHaveGroup?: boolean;
  allowedUserRoles?: RoleEnum[];
  notificationContent?: string | number;
}
