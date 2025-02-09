import { AudienceTypeEnum } from '../app/enums/audience-type.enum';

export interface WebContentDto {
  id?: string;
  audienceType?: AudienceTypeEnum;
  title?: string | null;
  content?: string;
  description?: string;
  image?: string | null;
  author?: string;
  isAuthorVisible?: boolean;
  links?: string[];
  createdBy?: string;
  lastModifiedBy?: string;
  createdAt?: string;
  lastModifiedAt?: string;
}
