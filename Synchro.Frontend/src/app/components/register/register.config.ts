import { IFieldConfig, buildFieldConfig } from '../../common/controls/field-config';

export interface IRegisterConfig {
  firstName: Record<'firstName', IFieldConfig>;
  lastName: Record<'lastName', IFieldConfig>;
  email: Record<'email', IFieldConfig>;
  password: Record<'password', IFieldConfig>;
  age: Record<'age', IFieldConfig>;
}

export function getRegisterConfig(): IRegisterConfig {
  return {
    firstName: {
      firstName: buildFieldConfig().isRequired(),
    },
    lastName: {
      lastName: buildFieldConfig().isRequired(),
    },
    email: {
      email: buildFieldConfig().isRequired(),
    },
    password: {
      password: buildFieldConfig().isRequired(),
    },
    age: {
      age: buildFieldConfig().isRequired(),
    },
  };
}
