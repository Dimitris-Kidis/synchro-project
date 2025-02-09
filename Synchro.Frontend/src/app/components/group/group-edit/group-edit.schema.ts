import * as _ from 'lodash-es';
import { INumberEditControlSchema } from '../../../common/controls/number-edit-control/number-edit-control.schema';
import { ITextEditControlSchema } from '../../../common/controls/text-edit-control/text-edit-control.schema';

export interface IGroupEditSchema {
  formGroupName: string;
  name: ITextEditControlSchema;
  description: ITextEditControlSchema;
  code: ITextEditControlSchema;
  participantsLimitNumber: INumberEditControlSchema;
}

export function getGroupEditSchema(): IGroupEditSchema {
  const id = _.uniqueId('groupEditGroup');

  return {
    formGroupName: id,
    name: {
      controlId: 'nameId' + id,
      formName: 'nameForm',
      fieldName: 'name',
      translationKey: 'GROUP.LABEL.NAME',
      placeholder: 'GROUP.LABEL.NAME',
    },
    description: {
      controlId: 'descriptionId' + id,
      formName: 'descriptionForm',
      fieldName: 'description',
      translationKey: 'GROUP.LABEL.DESCRIPTION',
      placeholder: 'GROUP.LABEL.DESCRIPTION',
    },
    code: {
      controlId: 'codeId' + id,
      formName: 'codeForm',
      fieldName: 'code',
      translationKey: 'GROUP.LABEL.CODE',
      placeholder: 'GROUP.LABEL.CODE',
    },
    participantsLimitNumber: {
      controlId: 'participantsLimitNumberId' + id,
      formName: 'participantsLimitNumberForm',
      fieldName: 'participantsLimitNumber',
      translationKey: 'GROUP.LABEL.PARTICIPANTS_LIMIT',
      placeholder: 'GROUP.LABEL.PARTICIPANTS_LIMIT',
    },
  };
}
