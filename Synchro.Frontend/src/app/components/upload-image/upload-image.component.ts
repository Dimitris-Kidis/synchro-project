import { NgIf } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { AttachmentsService } from '../../../services/attachment.service';
import { PageSpinnerService } from '../../common/components/page-spinner/page-spinner.service';
import { DisplayErrorHelper } from '../../common/helpers/display-error.helper';
import { DocumentTypeEnum } from '../../enums/document-type.enum';

@Component({
  selector: 'synchro-upload-image',
  standalone: true,
  imports: [NgIf, MatIconModule, FontAwesomeModule, TranslateModule],
  templateUrl: './upload-image.component.html',
  styleUrl: './upload-image.component.scss',
})
export class UploadImageComponent {
  @Input() public imageUrl: string | null = null;
  @Input() public documentType: DocumentTypeEnum = DocumentTypeEnum.QuestionImage;
  @Input() public hasActions: boolean = false;
  @Output() public onFileUploaded = new EventEmitter<string | null>();

  public isLoading = true;
  public isBusy: boolean = false;

  public constructor(
    private readonly attachmentsService: AttachmentsService,
    private readonly pageSpinnerService: PageSpinnerService,
    private readonly displayErrorHelper: DisplayErrorHelper,
  ) {}

  public onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input?.files?.[0];

    if (file) {
      this.setIsBusy(true);

      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result as string;
      };

      reader.readAsDataURL(file);

      this.attachmentsService
        .createAttachment(file, this.documentType)
        .subscribe({
          next: (newUrl: string) => {
            console.log(newUrl);
            this.onFileUploaded.emit(newUrl);
          },
          error: (err: HttpErrorResponse) => {
            this.displayErrorHelper.displayErrorFunc(err);
          },
        })
        .add(() => this.setIsBusy(false));
    }
  }

  public onFileRemoved(): void {
    this.onFileUploaded.emit(null);
    this.imageUrl = null;
  }

  private setIsBusy(isBusy: boolean): void {
    this.isBusy = isBusy;
    this.pageSpinnerService.changeState(isBusy);
  }
}
