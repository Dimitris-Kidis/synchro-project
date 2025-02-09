import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { PageSpinnerService } from '../app/common/components/page-spinner/page-spinner.service';
import { DisplayErrorHelper } from '../app/common/helpers/display-error.helper';
import { CurrentUserProvider } from '../providers/current-user.provider';

export const currentUserResolver: ResolveFn<any> = async () => {
  const currentUserProvider: CurrentUserProvider = inject(CurrentUserProvider);
  const displayErrorHelper: DisplayErrorHelper = inject(DisplayErrorHelper);
  const router: Router = inject(Router);
  const spinner: PageSpinnerService = inject(PageSpinnerService);

  spinner.open();

  return currentUserProvider
    .init()
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          router.navigate(['no-access'], {
            state: {
              redirectUri: location.pathname + location.search,
            },
          });
        } else {
          displayErrorHelper.displayErrorFunc(error);
        }

        return throwError(() => error);
      }),
    )
    .subscribe()
    .add(() => spinner.close());
};
