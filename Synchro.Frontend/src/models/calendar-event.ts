export interface CalendarEventDto {
  id?: string;
  title?: string;
  description?: string;
  content?: string;
  links?: string[];
  startDateTime?: Date;
  userAvatar?: string;
  endDateTime?: Date;
  userId?: string;
  groupId?: string;
  createdBy?: string;
  lastModifiedBy?: string;
  createdAt?: string;
  lastModifiedAt?: string;
}
