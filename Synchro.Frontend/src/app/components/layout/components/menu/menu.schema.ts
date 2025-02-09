import { RoleEnum } from '../../../../enums/role.enum';
import { IMenuSection } from '../menu-item/menu-item';

export class MenuSchema {
  public static mainMenuSection: IMenuSection = {
    sectionTranslationKey: 'COMMON.MENU.MAIN',
    sectionItems: [
      {
        itemNameTranslationKey: 'MENU.ITEM.DASHBOARD',
        itemIcon: 'dashboard-icon',
        navigationPath: '/dashboard',
      },
      {
        itemNameTranslationKey: 'MENU.ITEM.MY_PROJECT',

        alternativeItemNameTranslationKey: 'MENU.ITEM.PROJECT',
        tooltipMessageTranslationKey: 'MENU.TOOLTIP.GROUP_REQUIRED',

        itemIcon: 'project-icon',
        prefixNavigationPath: '/project',
        hasToHaveGroup: true,

        navigationPath: '/groups',
        subItems: [
          {
            subItemNameTranslationKey: 'MENU.SUBITEM.WIKI',
            navigationPath: 'wiki',
            hasToHaveGroup: true,
          },
          {
            subItemNameTranslationKey: 'MENU.SUBITEM.BOARD',
            navigationPath: 'board',
            hasToHaveGroup: true,
          },
          {
            subItemNameTranslationKey: 'MENU.SUBITEM.FILE_STORAGE',
            navigationPath: 'file-storage',
            hasToHaveGroup: true,
          },
          // {
          //   subItemNameTranslationKey: 'MENU.SUBITEM.CHART',
          //   navigationPath: 'chart',
          //   hasToHaveGroup: true,
          // },
          {
            subItemNameTranslationKey: 'MENU.SUBITEM.CALENDAR',
            navigationPath: 'calendar',
            hasToHaveGroup: true,
          },
          // {
          //   subItemNameTranslationKey: 'MENU.SUBITEM.PERFORMANCE',
          //   navigationPath: 'performance',
          //   hasToHaveGroup: true,
          // },
          // {
          //   subItemNameTranslationKey: 'MENU.SUBITEM.ESTIMATION',
          //   navigationPath: 'estimation',
          //   hasToHaveGroup: true,
          // },
        ],
      },
    ],
  };

  public static teamMenuSection: IMenuSection = {
    sectionTranslationKey: 'MENU.SECTION.TEAM',
    sectionItems: [
      {
        itemNameTranslationKey: 'MENU.ITEM.MY_GROUP',
        alternativeItemNameTranslationKey: 'MENU.ITEM.GROUPS',
        navigationPath: '/groups',
        itemIcon: 'groups-icon',
        prefixNavigationPath: '/my-group',
        hasToHaveGroup: true,
        tooltipMessageTranslationKey: 'MENU.TOOLTIP.GROUP_REQUIRED',
        subItems: [
          {
            subItemNameTranslationKey: 'MENU.SUBITEM.PEOPLE',
            navigationPath: 'people',
            hasToHaveGroup: true,
          },
          {
            subItemNameTranslationKey: 'MENU.SUBITEM.CHAT',
            navigationPath: 'chat',
            hasToHaveGroup: true,
          },
          {
            subItemNameTranslationKey: 'MENU.SUBITEM.GROUP',
            navigationPath: 'group',
            allowedUserRoles: [RoleEnum.Manager, RoleEnum.Admin],
            hasToHaveGroup: true,
          },
        ],
      },
    ],
  };

  public static meMenuSection: IMenuSection = {
    sectionTranslationKey: 'MENU.SECTION.ME',
    sectionItems: [
      {
        itemNameTranslationKey: 'MENU.ITEM.MY_PROFILE',
        itemIcon: 'profile-icon',
        prefixNavigationPath: '/me',
        subItems: [
          {
            subItemNameTranslationKey: 'MENU.SUBITEM.PROFILE',
            navigationPath: 'profile',
          },
          {
            subItemNameTranslationKey: 'MENU.SUBITEM.REQUESTS',
            navigationPath: 'requests',
          },
          {
            subItemNameTranslationKey: 'MENU.SUBITEM.MY_BOT',
            navigationPath: 'my-bot',
          },
        ],
      },
    ],
  };

  public static adminMenuSection: IMenuSection = {
    sectionTranslationKey: 'MENU.SECTION.ADMINISTRATION',
    allowedUserRoles: [RoleEnum.Admin],
    sectionItems: [
      {
        itemNameTranslationKey: 'MENU.ITEM.PANEL',
        itemIcon: 'panel-icon',
        prefixNavigationPath: '/administration',
        subItems: [
          {
            subItemNameTranslationKey: 'MENU.SUBITEM.FEED',
            navigationPath: 'feed',
          },
          {
            subItemNameTranslationKey: 'MENU.SUBITEM.USERS',
            navigationPath: 'users',
          },
          {
            subItemNameTranslationKey: 'MENU.SUBITEM.BOT',
            navigationPath: 'bot',
          },
          // {
          //   subItemNameTranslationKey: 'MENU.SUBITEM.NOTIFICATIONS',
          //   navigationPath: 'notifications', TO DO
          // },
        ],
      },
    ],
  };

  public static logoutMenuSection: IMenuSection = {
    sectionTranslationKey: 'MENU.SECTION.OTHER',
    sectionItems: [
      {
        itemNameTranslationKey: 'MENU.ITEM.LOGOUT',
        itemIcon: 'logout-icon',
        navigationPath: '/logout',
      },
    ],
  };
}
