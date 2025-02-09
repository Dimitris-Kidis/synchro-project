import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { QuillModule } from 'ngx-quill';
import { WikiPageDto } from '../../../../models/wiki-page';
import { WikiPagesService } from '../../../../services/wiki-pages.service';
import { PageSpinnerService } from '../../../common/components/page-spinner/page-spinner.service';
import { TextEditControlComponent } from '../../../common/controls/text-edit-control/text-edit-control.component';
import { DisplayErrorHelper } from '../../../common/helpers/display-error.helper';
import { TagsComponent } from '../../tags/tags.component';
import { EditorConfig } from '../../text-editor/editor.config';
import { IWikiPageEditConfig, getWikiPageEditConfig } from './wiki-edit.config';
import { WikiPageEditQuillConfig } from './wiki-edit.quill.config';
import { IWikiPageEditSchema, getWikiPageEditSchema } from './wiki-edit.schema';

@Component({
  selector: 'synchro-wiki-edit',
  standalone: true,
  imports: [TranslateModule, FormsModule, TextEditControlComponent, QuillModule, CommonModule, TagsComponent],
  templateUrl: './wiki-edit.component.html',
  styleUrl: './wiki-edit.component.scss',
})
export class WikiEditComponent {
  @Input() public wikiPage: WikiPageDto = {};
  @Input() public isCreateMode: boolean = true;
  @Input() public quillConfig: EditorConfig = WikiPageEditQuillConfig.config;

  @Output() public refreshWikiPageList = new EventEmitter<void>();

  public isBusy: boolean = false;
  public tags: string[] = [];

  public config: IWikiPageEditConfig = getWikiPageEditConfig();
  public schema: IWikiPageEditSchema = getWikiPageEditSchema();

  public constructor(
    private readonly wikiPagesService: WikiPagesService,
    private readonly pageSpinnerService: PageSpinnerService,
    private readonly displayErrorHelper: DisplayErrorHelper,
  ) {}

  public save(): void {
    this.setIsBusy(true);

    const action$ = this.isCreateMode
      ? this.wikiPagesService.createWikiPage(this.wikiPage)
      : this.wikiPagesService.updateWikiPage(this.wikiPage);

    action$
      .subscribe({
        next: () => {
          this.refreshWikiPageList.emit();
        },
        error: (err) => this.displayErrorHelper.displayErrorFunc(err),
      })
      .add(() => this.setIsBusy(false));
  }

  public cancel(): void {
    this.refreshWikiPageList.emit();
  }

  public refreshTags(tags: string[]): void {
    this.wikiPage.tags = tags;
    this.tags = tags;
  }

  private setIsBusy(isBusy: boolean): void {
    this.isBusy = isBusy;
    this.pageSpinnerService.changeState(isBusy);
  }
}
