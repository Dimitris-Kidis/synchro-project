import * as _ from 'lodash-es';
import { IEmailEditControlSchema } from '../../common/controls/email-edit-control/email-edit-control.schema';
import { ITextEditControlSchema } from '../../common/controls/text-edit-control/text-edit-control.schema';

export interface ILoginSchema {
  formGroupName: string;
  email: IEmailEditControlSchema;
  password: ITextEditControlSchema;
}

export function getLoginSchema(): ILoginSchema {
  const id = _.uniqueId('loginGroup');

  return {
    formGroupName: id,
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
  };
}
