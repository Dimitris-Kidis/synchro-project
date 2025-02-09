import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FileStorageDto } from '../../../models/file-storage';
import { User } from '../../../models/user';
import { CurrentUserProvider } from '../../../providers/current-user.provider';
import { AttachmentsService } from '../../../services/attachment.service';
import { FileStorageService } from '../../../services/file-storage.service';
import { PageSpinnerService } from '../../common/components/page-spinner/page-spinner.service';
import { DisplayErrorHelper } from '../../common/helpers/display-error.helper';
import { SpinnerModule } from '../../directives/spinner/spinner.module';
import { DocumentTypeEnum } from '../../enums/document-type.enum';
import { EnumNamePipe } from '../../pipes/enum-name.pipe';
import { FileSizePipe } from '../../pipes/file-size.pipe';
import { EmptyListComponent } from '../empty-list/empty-list.component';

@Component({
  selector: 'synchro-file-storage',
  standalone: true,
  imports: [CommonModule, SpinnerModule, FileSizePipe, EnumNamePipe, TranslateModule, EmptyListComponent],
  templateUrl: './file-storage.component.html',
  styleUrl: './file-storage.component.scss',
})
export class FileStorageComponent implements OnInit {
  public isDragOver = false;
  public isBusy: boolean = false;
  public files: FileStorageDto[] = [];
  public currentUser: User;

  public DocumentTypeEnum = DocumentTypeEnum;

  public constructor(
    private readonly attachmentsService: AttachmentsService,
    private readonly fileStorageService: FileStorageService,
    private readonly pageSpinnerService: PageSpinnerService,
    private readonly displayErrorHelper: DisplayErrorHelper,
    private readonly currentUserProvider: CurrentUserProvider,
  ) {
    this.currentUser = this.currentUserProvider.currentUser;
  }

  public ngOnInit(): void {
    this.loadAll();
  }

  public onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = true;
  }

  public onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
  }

  public onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;

    if (event.dataTransfer?.files?.length) {
      const file = event.dataTransfer.files[0];
      console.log(file);
      this.uploadFile(file);
    }
  }

  public onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input?.files?.[0];

    if (file) {
      console.log(file);
      this.uploadFile(file);
    }
  }

  public uploadFile(file: File): void {
    this.setIsBusy(true);

    this.attachmentsService
      .createAttachment(file, DocumentTypeEnum.StorageFile)
      .subscribe({
        next: (fileLink: string) => {
          this.addFileToStorage(file, fileLink);
        },
        error: (err: HttpErrorResponse) => {
          this.displayErrorHelper.displayErrorFunc(err);
        },
      })
      .add(() => this.setIsBusy(false));
  }

  public downloadFile(url: string, fileName: string): void {
    const link = document.createElement('a');
    link.href = url;

    link.download = fileName;

    link.click();

    link.remove();
  }

  public addFileToStorage(file: File, fileLink: string): void {
    this.setIsBusy(true);

    const command: FileStorageDto = {
      fileName: file.name,
      type: DocumentTypeEnum.StorageFile,
      link: fileLink,
      size: file.size.toString(),
      userId: this.currentUser.id!,
      groupId: this.currentUser.groupId!,
    };

    this.fileStorageService
      .createFile(command)
      .subscribe({
        next: () => {
          this.loadAll();
        },
        error: (err: HttpErrorResponse) => {
          this.displayErrorHelper.displayErrorFunc(err);
        },
      })
      .add(() => {
        this.setIsBusy(false);
      });
  }

  public removeFile(id: string): void {
    this.setIsBusy(true);

    this.fileStorageService
      .deleteFile(id)
      .subscribe({
        next: () => {
          this.loadAll();
        },
        error: (err: HttpErrorResponse) => {
          this.displayErrorHelper.displayErrorFunc(err);
        },
      })
      .add(() => {
        this.setIsBusy(false);
      });
  }

  public loadAll(): void {
    this.setIsBusy(true);

    this.fileStorageService
      .getAllFiles(this.currentUser.groupId!)
      .subscribe({
        next: (files: FileStorageDto[]) => {
          this.files = files;
        },
        error: (err: HttpErrorResponse) => {
          this.displayErrorHelper.displayErrorFunc(err);
        },
      })
      .add(() => {
        this.setIsBusy(false);
      });
  }

  private setIsBusy(isBusy: boolean): void {
    this.isBusy = isBusy;
    this.pageSpinnerService.changeState(isBusy);
  }
}
