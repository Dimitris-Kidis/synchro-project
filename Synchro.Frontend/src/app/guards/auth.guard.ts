import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { environment } from '../../environment/environment';
import { AuthenticationService } from '../../services/authentification.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  const signPages: string[] = [environment.redirectToLoginAuthUrl, environment.redirectToRegisterAuthUrl];

  if (!authService.isLoggedIn()) {
    if (signPages.includes(state.url)) {
      return true;
    }

    router.navigate([environment.redirectToRegisterAuthUrl]);
    return false;
  }

  if (signPages.includes(state.url)) {
    router.navigate([environment.redirectAfterAuthUrl]);
    return false;
  }

  return true;
};
