import { IFieldConfig, buildFieldConfig } from '../../../common/controls/field-config';

export interface IPostEditConfig {
  title: Record<'title', IFieldConfig>;
  description: Record<'description', IFieldConfig>;
  content: Record<'content', IFieldConfig>;
  audienceType: Record<'audienceType', IFieldConfig>;
  isAuthorVisible: Record<'isAuthorVisible', IFieldConfig>;
}

export function getPostEditConfig(): IPostEditConfig {
  return {
    title: {
      title: buildFieldConfig().isRequired(),
    },
    description: {
      description: buildFieldConfig(),
    },
    content: {
      content: buildFieldConfig(),
    },
    audienceType: {
      audienceType: buildFieldConfig().isRequired().isActive(),
    },
    isAuthorVisible: {
      isAuthorVisible: buildFieldConfig(),
    },
  };
}
