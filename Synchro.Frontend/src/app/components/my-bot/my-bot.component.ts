import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { QuestionDataDto } from '../../../models/question';
import { QuestionsService } from '../../../services/questions.service';
import { PageSpinnerService } from '../../common/components/page-spinner/page-spinner.service';
import { DisplayErrorHelper } from '../../common/helpers/display-error.helper';
import { DividerPositionEnum } from '../../enums/divider.enum';
import { SharedModule } from '../../shared/shared.module';
import { DividerComponent } from '../divider/divider.component';
import { ProgressCircleComponent } from '../progress-circle/progress-circle.component';

@Component({
  selector: 'synchro-my-bot',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    TranslateModule,
    ProgressCircleComponent,
    DividerComponent,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './my-bot.component.html',
  styleUrl: './my-bot.component.scss',
})
export class MyBotComponent implements OnInit {
  public isBusy: boolean = false;
  public questionDataDto: QuestionDataDto = {};
  public DividerPositionEnum = DividerPositionEnum;
  public questionHoverIsOn: boolean = false;

  public constructor(
    private readonly displayErrorHelper: DisplayErrorHelper,
    private readonly pageSpinnerService: PageSpinnerService,
    private readonly questionsService: QuestionsService,
  ) {}

  public ngOnInit(): void {
    this.setIsBusy(true);

    this.questionsService
      .getQuestionsData()
      .subscribe({
        next: (data: QuestionDataDto) => (this.questionDataDto = data),
        error: (err: HttpErrorResponse) => {
          this.displayErrorHelper.displayErrorFunc(err);
        },
      })
      .add(() => this.setIsBusy(false));
  }

  public takeWholePart(num: number): number {
    return Number.isNaN(Math.trunc(num)) ? 0 : Math.trunc(num);
  }

  private setIsBusy(isBusy: boolean): void {
    this.isBusy = isBusy;
    this.pageSpinnerService.changeState(isBusy);
  }
}
