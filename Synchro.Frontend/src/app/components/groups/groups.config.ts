import { IFieldConfig, buildFieldConfig } from '../../common/controls/field-config';

export interface IGroupsConfig {
  searchInput: Record<'searchInput', IFieldConfig>;
}

export function getGroupsConfig(): IGroupsConfig {
  return {
    searchInput: {
      searchInput: buildFieldConfig(),
    },
  };
}
