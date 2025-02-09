import * as _ from 'lodash-es';
import { IEmailEditControlSchema } from '../../common/controls/email-edit-control/email-edit-control.schema';
import { INumberEditControlSchema } from '../../common/controls/number-edit-control/number-edit-control.schema';
import { ITextEditControlSchema } from '../../common/controls/text-edit-control/text-edit-control.schema';

export interface IRegisterSchema {
  formGroupName: string;
  firstName: ITextEditControlSchema;
  lastName: ITextEditControlSchema;
  email: IEmailEditControlSchema;
  password: ITextEditControlSchema;
  age: INumberEditControlSchema;
}

export function getRegisterSchema(): IRegisterSchema {
  const id = _.uniqueId('registerGroup');

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
    email: {
      controlId: 'emailId' + id,
      formName: 'emailForm',
      fieldName: 'email',
      translationKey: 'LOGIN.EMAIL_LONG',
      placeholder: 'LOGIN.EMAIL_SHORT',
    },
    password: {
      controlId: 'passwordId' + id,
      formName: 'passwordForm',
      fieldName: 'password',
      type: 'password',
      translationKey: 'LOGIN.PASSWORD',
      placeholder: 'LOGIN.PASSWORD',
    },
    age: {
      controlId: 'ageId' + id,
      formName: 'ageForm',
      fieldName: 'age',
      translationKey: 'REGISTRATION.FIELD_NAME.AGE',
      placeholder: 'REGISTRATION.FIELD_NAME.AGE',
    },
  };
}
