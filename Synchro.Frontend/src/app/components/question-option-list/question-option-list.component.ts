import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import * as _ from 'lodash-es';

import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'synchro-question-option-list',
  standalone: true,
  imports: [
    MatRadioModule,
    MatIconModule,
    FormsModule,
    CommonModule,
    CdkDrag,
    CdkDropList,
    FontAwesomeModule,
    TranslateModule,
  ],
  templateUrl: './question-option-list.component.html',
  styleUrl: './question-option-list.component.scss',
})
export class QuestionOptionListComponent implements OnInit {
  @Input() public options: string[] = [];
  @Input() public correctOption: string | null = null;
  @Input() public maxOptions: number = 5;
  @Input() public isEditMode: boolean = true;

  @Output() public optionsChange = new EventEmitter<string[]>();
  @Output() public correctOptionChange = new EventEmitter<string>();

  public localOptions: { value: string; isCorrect: boolean }[] = [];

  public uniqueId: string = _.uniqueId('viewOptionId');

  public ngOnInit(): void {
    this.initializeOptions();
  }

  public addNewOption(index: number): void {
    if (this.localOptions.length < this.maxOptions) {
      this.localOptions.splice(index + 1, 0, { value: '', isCorrect: false });
    }
  }

  public removeOption(index: number): void {
    if (this.localOptions.length > 1) {
      if (this.localOptions[index].isCorrect) {
        const indexForCorrect = index - 1 < 0 ? 0 : index - 1;
        this.localOptions[indexForCorrect].isCorrect = true;
      }

      this.localOptions.splice(index, 1);
      this.emitChanges();
    }
  }

  public onInputChange(skipIndex: number): void {
    this.localOptions = this.localOptions.filter((option, index) => {
      if (index === skipIndex) {
        return true;
      }

      return option.value.trim() !== '';
    });

    const hasCorrectOption = this.localOptions.some((option) => option.isCorrect);

    if (!hasCorrectOption && this.localOptions.length > 0) {
      this.localOptions[this.localOptions.length - 1].isCorrect = true;
    }

    this.emitChanges();
  }

  public setCorrectOption(index: number): void {
    this.localOptions.forEach((option, i) => {
      if (!option.value || option.value == '') {
        return;
      }

      option.isCorrect = i === index;
    });
    this.emitChanges();
  }

  public drop(event: CdkDragDrop<{ value: string; isCorrect: boolean }[]>): void {
    moveItemInArray(this.localOptions, event.previousIndex, event.currentIndex);
    this.emitChanges();
  }

  public resetOptions(): void {
    this.options = [];
    this.initializeOptions();
  }

  private initializeOptions(): void {
    if (this.options.length === 0) {
      this.localOptions = [{ value: '', isCorrect: true }];
    } else {
      this.localOptions = this.options.map((option) => ({
        value: option,
        isCorrect: option === this.correctOption,
      }));
    }
  }

  private emitChanges(): void {
    this.optionsChange.emit(this.localOptions.map((o) => o.value));
    this.correctOptionChange.emit(this.localOptions.find((o) => o.isCorrect)?.value || '');
  }
}
