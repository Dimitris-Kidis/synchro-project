import { IFieldConfig, buildFieldConfig } from '../../../common/controls/field-config';

export interface IProfileEditConfig {
  firstName: Record<'firstName', IFieldConfig>;
  lastName: Record<'lastName', IFieldConfig>;
  age: Record<'age', IFieldConfig>;
  oldPassword: Record<'oldPassword', IFieldConfig>;
  newPassword: Record<'newPassword', IFieldConfig>;
}

export function getProfileEditConfig(): IProfileEditConfig {
  return {
    firstName: {
      firstName: buildFieldConfig(),
    },
    lastName: {
      lastName: buildFieldConfig(),
    },
    age: {
      age: buildFieldConfig(),
    },
    oldPassword: {
      oldPassword: buildFieldConfig(),
    },
    newPassword: {
      newPassword: buildFieldConfig(),
    },
  };
}
