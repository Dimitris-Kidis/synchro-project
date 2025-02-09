import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'synchro-tags',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.scss',
})
export class TagsComponent {
  @Input() public tags: string[] = [];
  @Input() public isEditMode: boolean = false;

  @Output() public refreshTags = new EventEmitter<string[]>();

  public newTag: string = '';
  public isAddingTag: boolean = false;
  public tagsString: string = '';

  public startAddingTag(): void {
    this.isAddingTag = true;
  }

  public stopAddingTag(): void {
    this.isAddingTag = false;
    this.newTag = '';
  }

  public addTag(): void {
    const trimmedTag = this.newTag.trim();
    if (trimmedTag && !this.tags.includes(trimmedTag)) {
      this.tags.push(trimmedTag);

      this.refreshTags.emit(this.tags);
    }

    this.newTag = '';
    this.isAddingTag = false;
  }

  public removeTag(index: number): void {
    this.tags.splice(index, 1);
    this.refreshTags.emit(this.tags);
  }
}
