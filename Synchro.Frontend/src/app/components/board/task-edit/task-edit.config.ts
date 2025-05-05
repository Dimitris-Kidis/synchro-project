import { IFieldConfig, buildFieldConfig } from '../../../common/controls/field-config';

export interface ITaskEditConfig {
  title: Record<'title', IFieldConfig>;
  description: Record<'description', IFieldConfig>;
  priority: Record<'priority', IFieldConfig>;
  type: Record<'type', IFieldConfig>;
  status: Record<'status', IFieldConfig>;
  state: Record<'state', IFieldConfig>;
}

export function getTaskEditConfig(): ITaskEditConfig {
  return {
    title: {
      title: buildFieldConfig().isRequired(),
    },
    description: {
      description: buildFieldConfig(),
    },
    priority: {
      priority: buildFieldConfig().isRequired(),
    },
    type: {
      type: buildFieldConfig().isRequired(),
    },
    status: {
      status: buildFieldConfig().isRequired(),
    },
    state: {
      state: buildFieldConfig().isRequired(),
    },
  };
}
