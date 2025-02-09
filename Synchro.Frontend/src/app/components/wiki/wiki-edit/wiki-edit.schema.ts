import * as _ from 'lodash-es';
import { ITextEditControlSchema } from '../../../common/controls/text-edit-control/text-edit-control.schema';

export interface IWikiPageEditSchema {
  formGroupName: string;
  title: ITextEditControlSchema;
}

export function getWikiPageEditSchema(): IWikiPageEditSchema {
  const id = _.uniqueId('wikiPageEditGroup');

  return {
    formGroupName: id,
    title: {
      controlId: 'titleId' + id,
      formName: 'titleForm',
      fieldName: 'title',
      autofocus: true,
      translationKey: 'WIKI.PAGE.LABEL.TITLE',
      placeholder: 'WIKI.PAGE.LABEL.TITLE',
      minLength: 0,
      maxLength: 40,
    },
  };
}
