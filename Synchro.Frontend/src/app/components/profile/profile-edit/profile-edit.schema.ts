import * as _ from 'lodash-es';
import { INumberEditControlSchema } from '../../../common/controls/number-edit-control/number-edit-control.schema';
import { ITextEditControlSchema } from '../../../common/controls/text-edit-control/text-edit-control.schema';

export interface IProfileEditSchema {
  formGroupName: string;
  firstName: ITextEditControlSchema;
  lastName: ITextEditControlSchema;
  age: INumberEditControlSchema;
  oldPassword: ITextEditControlSchema;
  newPassword: ITextEditControlSchema;
}

export function getProfileEditSchema(): IProfileEditSchema {
  const id = _.uniqueId('profileEditGroup');

  return {
    formGroupName: id,
    firstName: {
      controlId: 'firstNameId' + id,
      formName: 'firstNameForm',
      fieldName: 'firstName',
      translationKey: 'REGISTRATION.FIELD_NAME.FIRST_NAME',
      placeholder: 'REGISTRATION.FIELD_NAME.FIRST_NAME',
    },
    lastName: {
      controlId: 'lastNameId' + id,
      formName: 'lastNameForm',
      fieldName: 'lastName',
      translationKey: 'REGISTRATION.FIELD_NAME.LAST_NAME',
      placeholder: 'REGISTRATION.FIELD_NAME.LAST_NAME',
    },
    age: {
      controlId: 'ageId' + id,
      formName: 'ageForm',
      fieldName: 'age',
      translationKey: 'REGISTRATION.FIELD_NAME.AGE',
      placeholder: 'REGISTRATION.FIELD_NAME.AGE',
    },
    oldPassword: {
      controlId: 'oldPasswordId' + id,
      formName: 'oldPasswordForm',
      fieldName: 'oldPassword',
      type: 'password',
      translationKey: 'PROFILE.EDIT.FIELD.OLD_PASSWORD',
      placeholder: 'PROFILE.EDIT.FIELD.OLD_PASSWORD',
    },
    newPassword: {
      controlId: 'newPasswordId' + id,
      formName: 'newPasswordForm',
      fieldName: 'newPassword',
      type: 'password',
      translationKey: 'PROFILE.EDIT.FIELD.NEW_PASSWORD',
      placeholder: 'PROFILE.EDIT.FIELD.NEW_PASSWORD',
    },
  };
}
