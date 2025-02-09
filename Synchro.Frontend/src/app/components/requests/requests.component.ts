import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { RequestDto } from '../../../commands/requests-commands';
import { User } from '../../../models/user';
import { CurrentUserProvider } from '../../../providers/current-user.provider';
import { RequestsService } from '../../../services/requests.service';
import { PageSpinnerService } from '../../common/components/page-spinner/page-spinner.service';
import { DisplayErrorHelper } from '../../common/helpers/display-error.helper';
import { SpinnerModule } from '../../directives/spinner/spinner.module';
import { SharedModule } from '../../shared/shared.module';
import { RequestsViewComponent } from './requests-view/requests-view.component';

@Component({
  selector: 'synchro-requests',
  standalone: true,
  imports: [SharedModule, FormsModule, MatButtonModule, MatTabsModule, RequestsViewComponent, SpinnerModule],
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.scss',
})
export class RequestsComponent implements OnInit {
  public isBusy: boolean = false;
  public user: User = {};

  public requestsDto: RequestDto[];

  public sentRequests: RequestDto[] = [];
  public receivedRequests: RequestDto[] = [];

  public constructor(
    private readonly currentUserProvider: CurrentUserProvider,
    private readonly requestsService: RequestsService,
    private readonly pageSpinnerService: PageSpinnerService,
    private readonly displayErrorHelper: DisplayErrorHelper,
  ) {
    this.user = this.currentUserProvider.currentUser;
  }

  public ngOnInit(): void {
    this.getRequests();
  }

  public getRequests(): void {
    this.setIsBusy(true);

    this.requestsService
      .getMyRequests()
      .subscribe({
        next: (data: RequestDto[]) => {
          this.requestsDto = data;
          this.filterRequests();
        },
        error: (err: HttpErrorResponse) => {
          this.displayErrorHelper.displayErrorFunc(err);
        },
      })
      .add(() => this.setIsBusy(false));
  }

  public filterRequests(): void {
    this.sentRequests = this.requestsDto.filter((request) => request.senderId === this.user.id);
    this.receivedRequests = this.requestsDto.filter((request) => request.senderId !== this.user.id);
  }

  private setIsBusy(isBusy: boolean): void {
    this.isBusy = isBusy;
    this.pageSpinnerService.changeState(isBusy);
  }
}
