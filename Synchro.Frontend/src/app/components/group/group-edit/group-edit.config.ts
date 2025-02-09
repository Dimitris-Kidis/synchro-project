import { IFieldConfig, buildFieldConfig } from '../../../common/controls/field-config';

export interface IGroupEditConfig {
  name: Record<'name', IFieldConfig>;
  description: Record<'description', IFieldConfig>;
  code: Record<'code', IFieldConfig>;
  participantsLimitNumber: Record<'participantsLimitNumber', IFieldConfig>;
}

export function getGroupEditConfig(): IGroupEditConfig {
  return {
    name: {
      name: buildFieldConfig().isRequired(),
    },
    description: {
      description: buildFieldConfig(),
    },
    code: {
      code: buildFieldConfig().isRequired(),
    },
    participantsLimitNumber: {
      participantsLimitNumber: buildFieldConfig(),
    },
  };
}
