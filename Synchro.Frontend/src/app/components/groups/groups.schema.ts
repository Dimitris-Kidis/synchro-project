import * as _ from 'lodash-es';
import { ITextEditControlSchema } from '../../common/controls/text-edit-control/text-edit-control.schema';

export interface IGroupsSchema {
  formGroupName: string;
  searchInput: ITextEditControlSchema;
}

export function getGroupsSchema(): IGroupsSchema {
  const id = _.uniqueId('searchInputGroup');

  return {
    formGroupName: id,
    searchInput: {
      controlId: 'searchInputId' + id,
      formName: 'searchInputForm',
      fieldName: 'searchInput',
      autofocus: true,
      placeholder: 'GROUPS.SEARCH.PLACEHOLDER',
    },
  };
}
