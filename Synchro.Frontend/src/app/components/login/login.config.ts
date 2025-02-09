import { IFieldConfig, buildFieldConfig } from '../../common/controls/field-config';

export interface ILoginConfig {
  email: Record<'email', IFieldConfig>;
  password: Record<'password', IFieldConfig>;
}

export function getLoginConfig(): ILoginConfig {
  return {
    email: {
      email: buildFieldConfig().isRequired(),
    },
    password: {
      password: buildFieldConfig().isRequired(),
    },
  };
}
