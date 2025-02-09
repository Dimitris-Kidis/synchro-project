import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { QuillModule } from 'ngx-quill';
import { WebContentDto } from '../../../../models/web-content';
import { WebContentsService } from '../../../../services/web-content.service';
import { PageSpinnerService } from '../../../common/components/page-spinner/page-spinner.service';
import { CheckboxEditControlComponent } from '../../../common/controls/checkbox/checkbox-edit-control/checkbox-edit-control.component';
import { ComboEditControlComponent } from '../../../common/controls/combo-edit-control/combo-edit-control.component';
import { TextEditControlComponent } from '../../../common/controls/text-edit-control/text-edit-control.component';
import { DisplayErrorHelper } from '../../../common/helpers/display-error.helper';
import { LinkListComponent } from '../../link-list/link-list.component';
import { EditorConfig } from '../../text-editor/editor.config';
import { UploadImageComponent } from '../../upload-image/upload-image.component';
import { IPostEditConfig, getPostEditConfig } from './post-edit.config';
import { PostEditQuillConfig } from './post-edit.quill.config';
import { IPostEditSchema, getPostEditSchema } from './post-edit.schema';

@Component({
  selector: 'synchro-post-edit',
  standalone: true,
  imports: [
    TranslateModule,
    FormsModule,
    TextEditControlComponent,
    ComboEditControlComponent,
    UploadImageComponent,
    CheckboxEditControlComponent,
    QuillModule,
    CommonModule,
    LinkListComponent,
  ],
  templateUrl: './post-edit.component.html',
  styleUrl: './post-edit.component.scss',
})
export class PostEditComponent {
  @Input() public post: WebContentDto = { isAuthorVisible: true };
  @Input() public isCreateMode: boolean = true;
  @Input() public quillConfig: EditorConfig = PostEditQuillConfig.config;

  @Output() public refreshPostList = new EventEmitter<void>();

  public isBusy: boolean = false;

  public config: IPostEditConfig = getPostEditConfig();
  public schema: IPostEditSchema = getPostEditSchema();

  public constructor(
    private readonly webContentsService: WebContentsService,
    private readonly pageSpinnerService: PageSpinnerService,
    private readonly displayErrorHelper: DisplayErrorHelper,
  ) {}

  public save(): void {
    this.setIsBusy(true);

    const action$ = this.isCreateMode
      ? this.webContentsService.createPost(this.post)
      : this.webContentsService.updatePost(this.post);

    action$
      .subscribe({
        next: () => {
          this.refreshPostList.emit();
        },
        error: (err) => this.displayErrorHelper.displayErrorFunc(err),
      })
      .add(() => this.setIsBusy(false));
  }

  public cancel(): void {
    this.refreshPostList.emit();
  }

  public setPostImage(newUrl: string | null): void {
    this.post.image = newUrl;
    console.log(this.post);
  }

  private setIsBusy(isBusy: boolean): void {
    this.isBusy = isBusy;
    this.pageSpinnerService.changeState(isBusy);
  }
}
