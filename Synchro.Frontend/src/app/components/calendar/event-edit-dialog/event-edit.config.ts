import { IFieldConfig, buildFieldConfig } from '../../../common/controls/field-config';

export interface IEventEditConfig {
  title: Record<'title', IFieldConfig>;
  description: Record<'description', IFieldConfig>;
  startDateTime: Record<'startDateTime', IFieldConfig>;
}

export function getEventEditConfig(): IEventEditConfig {
  return {
    title: {
      title: buildFieldConfig().isRequired(),
    },
    description: {
      description: buildFieldConfig(),
    },
    startDateTime: {
      startDateTime: buildFieldConfig(),
    },
  };
}
