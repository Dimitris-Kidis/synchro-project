import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { GroupDto, GroupUserDto } from '../../../../models/groups';
import { User } from '../../../../models/user';
import { PageSpinnerModule } from '../../../common/components/page-spinner/page-spinner.module';
import { DocumentTypeEnum } from '../../../enums/document-type.enum';
import { ImageSizeEnum } from '../../../enums/image-size.enum';
import { PeopleComponent } from '../../people/people.component';
import { UploadImageComponent } from '../../upload-image/upload-image.component';

@Component({
  selector: 'synchro-group-view',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    PageSpinnerModule,
    TranslateModule,
    UploadImageComponent,
    PeopleComponent,
  ],
  templateUrl: './group-view.component.html',
  styleUrl: './group-view.component.scss',
})
export class GroupViewComponent {
  @Output() public setEditMode = new EventEmitter<boolean>();
  @Input({ required: true }) public group: GroupDto = {};
  public ImageSizeEnum = ImageSizeEnum;
  public DocumentTypeEnum = DocumentTypeEnum;

  public edit(): void {
    this.setEditMode.emit(true);
  }

  public setGroupImage(newUrl: string | null): void {
    this.group.image = newUrl;
  }

  public mapUser(user: GroupUserDto): User {
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      image: user.image,
    };
  }
}
