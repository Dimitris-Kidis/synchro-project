import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../../environment/environment';
import { UserForRegistrationDto } from '../../../models/auth';
import { AuthenticationService } from '../../../services/authentification.service';
import { PageSpinnerModule } from '../../common/components/page-spinner/page-spinner.module';
import { PageSpinnerService } from '../../common/components/page-spinner/page-spinner.service';
import { EmailEditControlComponent } from '../../common/controls/email-edit-control/email-edit-control.component';
import { NumberEditControlComponent } from '../../common/controls/number-edit-control/number-edit-control.component';
import { TextEditControlComponent } from '../../common/controls/text-edit-control/text-edit-control.component';
import { DisplayErrorHelper } from '../../common/helpers/display-error.helper';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { NotificationModalModule } from '../notification-modal/notification-modal.module';
import { TypeWriterComponent } from '../type-writer/type-writer.component';
import { IRegisterConfig, getRegisterConfig } from './register.config';
import { IRegisterSchema, getRegisterSchema } from './register.schema';

@Component({
  selector: 'synchro-register',
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
    TranslateModule,
    TypeWriterComponent,
    NumberEditControlComponent,
    EmailEditControlComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  public basicStaticText: string = 'Synchro is';
  public isBusy: boolean = false;

  public config: IRegisterConfig = getRegisterConfig();
  public schema: IRegisterSchema = getRegisterSchema();

  public signUpInfo: UserForRegistrationDto = {};

  public constructor(
    private readonly router: Router,
    private readonly authService: AuthenticationService,
    private readonly displayErrorHelper: DisplayErrorHelper,
    private readonly pageSpinnerService: PageSpinnerService,
  ) {}

  public register(): void {
    this.setIsBusy(true);

    this.authService
      .register(this.signUpInfo)
      .pipe(catchError((error: unknown) => throwError(() => error)))
      .subscribe({
        error: (err: HttpErrorResponse) => {
          this.displayErrorHelper.displayErrorFunc(err);
        },
      })
      .add(() => this.setIsBusy(false));
  }

  public redirectToSignIn(): void {
    this.router.navigate([environment.redirectToLoginAuthUrl]);
  }

  private setIsBusy(isBusy: boolean): void {
    this.isBusy = isBusy;
    this.pageSpinnerService.changeState(isBusy);
  }
}
