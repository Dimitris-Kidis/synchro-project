import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContentChange, QuillModule } from 'ngx-quill';
import { EditorConfig } from './editor.config';

@Component({
  selector: 'synchro-text-editor',
  standalone: true,
  imports: [CommonModule, QuillModule, FormsModule],
  templateUrl: './text-editor.component.html',
  styleUrl: './text-editor.component.scss',
})
export class TextEditorComponent {
  @Input() public content: string = ''; // HTML или текстовое содержимое
  @Output() public contentChange = new EventEmitter<string>(); // Событие для обновления содержимого

  @Input() public config: EditorConfig = {
    placeholder: 'Start typing...',
    readOnly: false,
    format: 'html',
    modules: {
      toolbar: [
        ['bold', 'italic', 'underline'], // Форматирование текста
        [{ list: 'ordered' }, { list: 'bullet' }], // Списки
        ['link', 'image'], // Вставка ссылок и изображений
        [{ header: [1, 2, 3, false] }], // Заголовки
        ['clean'], // Очистка форматирования
      ],
    },
    // characterLimit: 6,
    // showCharacterCount: true,
  };

  public characterCount: number = 0; // Количество символов

  // Обработчик изменения контента
  public contentChanged(content: ContentChange): void {
    this.contentChange.emit(this.content);
    // this.updateCharacterCount();
    // this.checkCharacterLimit();
  }
  // Проверка, если превышен лимит символов
  public isCharacterLimitExceeded(): boolean {
    return this.characterCount > (this.config?.characterLimit ?? 0);
  }

  private updateCharacterCount(): void {
    this.characterCount = this.getTextLength(this.content);
  }

  // Функция для подсчета только текстовых символов, игнорируя HTML-теги
  private getTextLength(content: string): number {
    const text = content.replace(/<\/?[^>]+(>|$)/g, ''); // Убираем все HTML теги
    return text.length; // Возвращаем длину очищенного текста
  }

  // Проверка лимита символов и блокировка контента
  private checkCharacterLimit(): void {
    if (this.isCharacterLimitExceeded()) {
      this.disableEditor();
    } else {
      this.enableEditor();
    }
  }

  // Отключение редактирования, если лимит превышен
  private disableEditor(): void {
    if (!this.config.readOnly) {
      this.config.readOnly = true;
    }
  }

  // Включение редактирования, если лимит не превышен
  private enableEditor(): void {
    if (this.config.readOnly) {
      this.config.readOnly = false;
    }
  }
}
