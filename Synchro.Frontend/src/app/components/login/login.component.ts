import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../../environment/environment';
import { UserForAuthenticationDto } from '../../../models/auth';
import { AuthenticationService } from '../../../services/authentification.service';
import { PageSpinnerModule } from '../../common/components/page-spinner/page-spinner.module';
import { PageSpinnerService } from '../../common/components/page-spinner/page-spinner.service';
import { EmailEditControlComponent } from '../../common/controls/email-edit-control/email-edit-control.component';
import { TextEditControlComponent } from '../../common/controls/text-edit-control/text-edit-control.component';
import { DisplayErrorHelper } from '../../common/helpers/display-error.helper';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { NotificationModalModule } from '../notification-modal/notification-modal.module';
import { TypeWriterComponent } from '../type-writer/type-writer.component';
import { ILoginConfig, getLoginConfig } from './login.config';
import { ILoginSchema, getLoginSchema } from './login.schema';

@Component({
  selector: 'synchro-login',
  standalone: true,
  imports: [
    FooterComponent,
    FormsModule,
    HeaderComponent,
    MatButtonModule,
    MatTooltipModule,
    NotificationModalModule,
    PageSpinnerModule,
    TextEditControlComponent,
    TextEditControlComponent,
    EmailEditControlComponent,
    TranslateModule,
    TypeWriterComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public basicStaticText: string = 'Synchro is';
  public isBusy: boolean = false;

  public config: ILoginConfig = getLoginConfig();
  public schema: ILoginSchema = getLoginSchema();

  public signInInfo: UserForAuthenticationDto = {};

  public constructor(
    private readonly authService: AuthenticationService,
    private readonly displayErrorHelper: DisplayErrorHelper,
    private readonly router: Router,
    private readonly pageSpinnerService: PageSpinnerService,
  ) {}

  public login(): void {
    this.setIsBusy(true);

    this.authService
      .login(this.signInInfo)
      .pipe(catchError((error: unknown) => throwError(() => error)))
      .subscribe({
        error: (err: HttpErrorResponse) => {
          this.displayErrorHelper.displayErrorFunc(err);
        },
      })
      .add(() => this.setIsBusy(false));
  }

  public redirectToSignUp(): void {
    this.router.navigate([environment.redirectToRegisterAuthUrl]);
  }

  private setIsBusy(isBusy: boolean): void {
    this.isBusy = isBusy;
    this.pageSpinnerService.changeState(isBusy);
  }
}
