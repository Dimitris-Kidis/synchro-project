import { IFieldConfig, buildFieldConfig } from '../../../common/controls/field-config';

export interface IWikiPageEditConfig {
  title: Record<'title', IFieldConfig>;
}

export function getWikiPageEditConfig(): IWikiPageEditConfig {
  return {
    title: {
      title: buildFieldConfig().isRequired(),
    },
  };
}
