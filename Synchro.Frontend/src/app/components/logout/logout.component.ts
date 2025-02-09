import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthenticationService } from '../../../services/authentification.service';
import { SignalRService } from '../../../services/signalr.service';
import { PageSpinnerModule } from '../../common/components/page-spinner/page-spinner.module';
import { PageSpinnerService } from '../../common/components/page-spinner/page-spinner.service';
import { DisplayErrorHelper } from '../../common/helpers/display-error.helper';

@Component({
  selector: 'synchro-logout',
  standalone: true,
  imports: [PageSpinnerModule],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss',
})
export class LogoutComponent implements OnInit {
  public constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly pageSpinnerService: PageSpinnerService,
    private readonly displayErrorHelper: DisplayErrorHelper,
    private readonly signalRService: SignalRService,
  ) {
    this.pageSpinnerService.open();
  }

  public ngOnInit(): void {
    this.authenticationService
      .logOut()
      .pipe(catchError((error: unknown) => throwError(() => error)))
      .subscribe({
        next: () => this.signalRService.disconnect(),
        error: (err: HttpErrorResponse) => {
          this.displayErrorHelper.displayErrorFunc(err);
        },
      })
      .add(() => this.pageSpinnerService.close());
  }
}
