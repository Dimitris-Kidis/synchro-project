import { Component, ViewEncapsulation } from '@angular/core';
import { environment } from '../../../environment/environment';
import { AuthenticationService } from '../../../services/authentification.service';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'synchro-not-found',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NotFoundComponent {
  public readonly baseUrl = environment.redirectAfterAuthUrl;
  public readonly baseLoginUrl = '/login';

  public isLoggedIn: boolean = false;

  public constructor(private readonly authService: AuthenticationService) {
    this.isLoggedIn = authService.isLoggedIn();
  }
}
