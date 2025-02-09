import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { environment } from '../../environment/environment';
import { CurrentUserProvider } from '../../providers/current-user.provider';
import { MessageService } from '../../services/message.service';

export const groupGuard: CanActivateFn = () => {
  const currentUserProvider = inject(CurrentUserProvider);
  const router = inject(Router);
  const messageService = inject(MessageService);

  if (currentUserProvider.hasGroup() === false) {
    messageService.showWarningByCode('NOTIFICATION.NEED_TO_HAVE_GROUP');
    router.navigate([environment.redirectToRegisterAuthUrl]);

    return false;
  }

  return true;
};
