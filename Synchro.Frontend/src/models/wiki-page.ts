export interface WikiPageDto {
  id?: string;
  title?: string;
  content?: string;
  tags?: string[];
  userAvatar?: string;
  groupId?: string;
  createdBy?: string;
  lastModifiedBy?: string;
  createdAt?: Date;
  lastModifiedAt?: Date;
}
