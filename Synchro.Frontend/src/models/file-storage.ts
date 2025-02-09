import { DocumentTypeEnum } from '../app/enums/document-type.enum';

export interface FileStorageDto {
  id?: string;
  fileName?: string;
  type?: DocumentTypeEnum;
  size?: string;
  link?: string;
  userId?: string;
  groupId?: string;
  createdBy?: string;
  lastModifiedBy?: string;
  createdAt?: string;
  lastModifiedAt?: string;
}
