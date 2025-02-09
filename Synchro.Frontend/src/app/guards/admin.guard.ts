import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { environment } from '../../environment/environment';
import { CurrentUserProvider } from '../../providers/current-user.provider';
import { MessageService } from '../../services/message.service';
import { RoleEnum } from '../enums/role.enum';

export const adminGuard: CanActivateFn = () => {
  const currentUserProvider = inject(CurrentUserProvider);
  const router = inject(Router);
  const messageService = inject(MessageService);

  if (currentUserProvider.hasSomeRole(RoleEnum.Admin) === false) {
    messageService.showErrorByCode('NOTIFICATION.PERMISSION.DENIED.ADMIN');
    router.navigate([environment.redirectAfterAuthUrl]);

    return false;
  }

  return true;
};
