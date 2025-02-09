import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { Question } from '../../../commands/questions-commands';
import { QuestionDto } from '../../../models/question';
import { QuestionsService } from '../../../services/questions.service';
import { PageSpinnerService } from '../../common/components/page-spinner/page-spinner.service';
import { DisplayErrorHelper } from '../../common/helpers/display-error.helper';
import { SpinnerModule } from '../../directives/spinner/spinner.module';
import { IconsModule } from '../../icons/icons.module';
import { DefaultValuePipe } from '../../pipes/default-value.pipe';
import { SharedModule } from '../../shared/shared.module';
import { EmptyListComponent } from '../empty-list/empty-list.component';
import { QuestionOptionListComponent } from '../question-option-list/question-option-list.component';
import { TagsComponent } from '../tags/tags.component';
import { QuestionEditComponent } from './question-edit/question-edit.component';

@Component({
  selector: 'synchro-bot-panel',
  standalone: true,
  imports: [
    SharedModule,
    FormsModule,
    MatButtonModule,
    MatTabsModule,
    SpinnerModule,
    QuestionEditComponent,
    DefaultValuePipe,
    EmptyListComponent,
    QuestionOptionListComponent,
    TagsComponent,
    IconsModule,
    MatIconModule,
  ],
  templateUrl: './bot-panel.component.html',
  styleUrl: './bot-panel.component.scss',
})
export class BotPanelComponent implements OnInit {
  public isBusy: boolean = false;

  public isEditQuestion: boolean = false;

  public currentQuestion: Question;

  public questions: QuestionDto[] = [];

  public constructor(
    private readonly questionsService: QuestionsService,
    private readonly pageSpinnerService: PageSpinnerService,
    private readonly displayErrorHelper: DisplayErrorHelper,
  ) {}

  public ngOnInit(): void {
    this.load();
  }

  public load(): void {
    this.questions = [];
    this.setIsBusy(true);

    this.questionsService
      .getAllQuestions()
      .subscribe({
        next: (data: QuestionDto[]) => {
          this.questions = data;
          console.log(data);
        },
        error: (err: HttpErrorResponse) => {
          this.displayErrorHelper.displayErrorFunc(err);
        },
      })
      .add(() => {
        this.setIsBusy(false);
      });
  }

  public deleteQuestion(id: string, index: number): void {
    this.setIsBusy(true);

    this.questionsService
      .deleteQuestion(id)
      .subscribe({
        next: () => {
          this.questions.splice(index, 1);
          this.load();
        },
        error: (err: HttpErrorResponse) => {
          this.displayErrorHelper.displayErrorFunc(err);
        },
      })
      .add(() => {
        this.setIsBusy(false);
      });
  }

  public editQuestion(index: number): void {
    this.isEditQuestion = true;
    this.currentQuestion = this.questions[index];
  }
  public cancel(): void {
    this.isEditQuestion = false;
  }

  private setIsBusy(isBusy: boolean): void {
    this.isBusy = isBusy;
    this.pageSpinnerService.changeState(isBusy);
  }
}
