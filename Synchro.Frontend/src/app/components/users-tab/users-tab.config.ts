import { IFieldConfig, buildFieldConfig } from '../../common/controls/field-config';

export interface IUsersSearchConfig {
  searchInput: Record<'searchInput', IFieldConfig>;
}

export function getUsersSearchConfig(): IUsersSearchConfig {
  return {
    searchInput: {
      searchInput: buildFieldConfig(),
    },
  };
}
