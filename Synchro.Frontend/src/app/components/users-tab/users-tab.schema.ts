import * as _ from 'lodash-es';
import { ITextEditControlSchema } from '../../common/controls/text-edit-control/text-edit-control.schema';

export interface IUsersSearchSchema {
  formGroupName: string;
  searchInput: ITextEditControlSchema;
}

export function getUsersSearchSchema(): IUsersSearchSchema {
  const id = _.uniqueId('searchInputGroup');

  return {
    formGroupName: id,
    searchInput: {
      controlId: 'searchInputId' + id,
      formName: 'searchInputForm',
      fieldName: 'searchInput',
      autofocus: true,
      placeholder: 'USERS.SEARCH.PLACEHOLDER',
    },
  };
}
