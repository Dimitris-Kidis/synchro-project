import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Question } from '../../../../commands/questions-commands';
import { QuestionsService } from '../../../../services/questions.service';
import { PageSpinnerService } from '../../../common/components/page-spinner/page-spinner.service';
import { DisplayErrorHelper } from '../../../common/helpers/display-error.helper';
import { QuestionOptionListComponent } from '../../question-option-list/question-option-list.component';
import { TagsComponent } from '../../tags/tags.component';
import { UploadImageComponent } from '../../upload-image/upload-image.component';

@Component({
  selector: 'synchro-question-edit',
  standalone: true,
  imports: [
    TranslateModule,
    CommonModule,
    QuestionOptionListComponent,
    FormsModule,
    TagsComponent,
    UploadImageComponent,
  ],
  templateUrl: './question-edit.component.html',
  styleUrl: './question-edit.component.scss',
})
export class QuestionEditComponent {
  @Input() public question: Question = { text: '', options: [] };
  @Input() public isCreateMode: boolean = true;

  @Output() public onCloseQuestionEdit = new EventEmitter<void>();
  @Output() public refreshQuestionList = new EventEmitter<void>();

  @ViewChild(QuestionOptionListComponent) public questionOptionListComponent!: QuestionOptionListComponent;

  public isBusy: boolean = false;
  public tags: string[] = [];

  public constructor(
    private readonly questionsService: QuestionsService,
    private readonly pageSpinnerService: PageSpinnerService,
    private readonly displayErrorHelper: DisplayErrorHelper,
  ) {}

  public save(): void {
    this.setIsBusy(true);

    const action$ = this.isCreateMode
      ? this.questionsService.createQuestion(this.question)
      : this.questionsService.updateQuestion(this.question);

    action$
      .subscribe({
        next: () => {
          if (this.isCreateMode) {
            this.reset();
          }
          this.refreshQuestionList.emit();
          this.onCloseQuestionEdit.emit();
        },
        error: (err) => this.displayErrorHelper.displayErrorFunc(err),
      })
      .add(() => this.setIsBusy(false));
  }

  public setQuestionImage(newUrl: string | null): void {
    this.question.image = newUrl;
  }

  public refreshTags(tags: string[]): void {
    this.question.topics = tags;
    this.tags = tags;
  }

  public setCorrectOption(option: string): void {
    this.question.correctAnswer = option;
  }

  public setOptions(options: string[]): void {
    this.question.options = options;
  }

  public cancel(): void {
    this.onCloseQuestionEdit.emit();
  }

  private setIsBusy(isBusy: boolean): void {
    this.isBusy = isBusy;
    this.pageSpinnerService.changeState(isBusy);
  }

  private reset(): void {
    this.question = { text: '', options: [] };
    this.tags = [];
    if (this.questionOptionListComponent) {
      this.questionOptionListComponent.resetOptions();
    }
  }
}
