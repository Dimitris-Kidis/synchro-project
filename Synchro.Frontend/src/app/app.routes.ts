import { Routes } from '@angular/router';
import { environment } from '../environment/environment';
import { currentUserResolver } from '../services/current-user.resolver';
import { LayoutComponent } from './components/layout/layout.component';
import { adminGuard } from './guards/admin.guard';
import { authGuard } from './guards/auth.guard';
import { groupGuard } from './guards/group.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: environment.redirectAfterAuthUrl,
  },
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.component').then((c) => c.LoginComponent),
    canActivate: [authGuard],
  },
  {
    path: 'register',
    loadComponent: () => import('./components/register/register.component').then((c) => c.RegisterComponent),
    canActivate: [authGuard],
  },
  {
    path: '',
    component: LayoutComponent,
    resolve: {
      currentUser: currentUserResolver,
    },
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        // resolve: {
        //   currentUser: currentUserResolver,
        // },
        loadComponent: () => import('./components/dashboard/dashboard.component').then((c) => c.DashboardComponent),
        data: {
          pageTitle: 'COMMON.MENU.MAIN',
        },
      },
      {
        path: 'groups',
        // resolve: {
        //   currentUser: currentUserResolver,
        // },
        loadComponent: () => import('./components/groups/groups.component').then((c) => c.GroupsComponent),
        data: {
          pageTitle: 'MENU.ITEM.GROUPS',
        },
      },
      {
        path: 'project',
        // canActivate: [authGuard, groupGuard],
        // canActivate: [authGuard, groupGuard, adminGuard],
        // resolve: {
        //   currentUser: currentUserResolver,
        // },
        children: [
          {
            path: 'wiki',
            // canActivate: [authGuard, groupGuard, adminGuard],
            loadComponent: () => import('./components/wiki/wiki.component').then((c) => c.WikiComponent),
            data: {
              pageTitle: 'MENU.SUBITEM.WIKI',
            },
          },
          {
            path: 'board',
            // canActivate: [authGuard, groupGuard, adminGuard],
            loadComponent: () => import('./components/board/board.component').then((c) => c.BoardComponent),
            data: {
              pageTitle: 'MENU.SUBITEM.BOARD',
            },
          },
          {
            path: 'file-storage',
            // canActivate: [authGuard, groupGuard, adminGuard],
            loadComponent: () =>
              import('./components/file-storage/file-storage.component').then((c) => c.FileStorageComponent),
            data: {
              pageTitle: 'MENU.SUBITEM.FILE_STORAGE',
            },
          },
          {
            path: 'calendar',
            // canActivate: [authGuard, groupGuard, adminGuard],
            loadComponent: () => import('./components/calendar/calendar.component').then((c) => c.CalendarComponent),
            data: {
              pageTitle: 'MENU.SUBITEM.CALENDAR',
            },
          },
        ],
      },

      {
        path: 'my-group',
        canActivate: [authGuard, groupGuard],
        // canActivate: [authGuard, groupGuard, adminGuard],
        // resolve: {
        //   currentUser: currentUserResolver,
        // },
        children: [
          {
            path: 'people',
            // canActivate: [authGuard, groupGuard, adminGuard],
            loadComponent: () => import('./components/people/people.component').then((c) => c.PeopleComponent),
            data: {
              pageTitle: 'MENU.SUBITEM.PEOPLE',
            },
          },
          {
            path: 'group',
            // canActivate: [authGuard, groupGuard, adminGuard],
            loadComponent: () => import('./components/group/group.component').then((c) => c.GroupComponent),
            data: {
              pageTitle: 'MENU.SUBITEM.GROUP',
            },
          },
          {
            path: 'chat',
            // canActivate: [authGuard, groupGuard, adminGuard],
            loadComponent: () => import('./components/chat/chat.component').then((c) => c.ChatComponent),
            data: {
              pageTitle: 'MENU.SUBITEM.CHAT',
            },
          },
        ],
      },

      {
        path: 'me',
        canActivate: [authGuard],
        children: [
          {
            path: 'profile',
            loadComponent: () => import('./components/profile/profile.component').then((c) => c.ProfileComponent),
            data: {
              pageTitle: 'MENU.SUBITEM.PROFILE',
            },
          },
          {
            path: 'requests',
            loadComponent: () => import('./components/requests/requests.component').then((c) => c.RequestsComponent),
            data: {
              pageTitle: 'MENU.SUBITEM.REQUESTS',
            },
          },
          {
            path: 'my-bot',
            loadComponent: () => import('./components/my-bot/my-bot.component').then((c) => c.MyBotComponent),
            data: {
              pageTitle: 'MENU.SUBITEM.MY_BOT',
            },
          },
        ],
      },

      {
        path: 'administration',
        canActivate: [authGuard, adminGuard],
        // canActivate: [authGuard, groupGuard, adminGuard],
        // resolve: {
        //   currentUser: currentUserResolver,
        // },
        children: [
          {
            path: 'feed',
            loadComponent: () => import('./components/feed/feed.component').then((c) => c.FeedComponent),
            data: {
              pageTitle: 'MENU.SUBITEM.FEED',
            },
          },
          {
            path: 'users',
            loadComponent: () => import('./components/users-tab/users-tab.component').then((c) => c.UsersTabComponent),
            data: {
              pageTitle: 'MENU.SUBITEM.USERS',
            },
          },
          {
            path: 'bot',
            loadComponent: () => import('./components/bot-panel/bot-panel.component').then((c) => c.BotPanelComponent),
            data: {
              pageTitle: 'MENU.SUBITEM.BOT',
            },
          },
        ],
      },
    ],
  },
  {
    path: 'logout',
    loadComponent: () => import('./components/logout/logout.component').then((c) => c.LogoutComponent),
    canActivate: [authGuard],
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.component').then((c) => c.NotFoundComponent),
  },
];
