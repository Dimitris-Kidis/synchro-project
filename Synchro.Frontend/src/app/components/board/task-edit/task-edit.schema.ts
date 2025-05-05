import * as _ from 'lodash-es';
import { IComboEditControlSchema } from '../../../common/controls/combo-edit-control/combo-edit-control.schema';
import { ITextEditControlSchema } from '../../../common/controls/text-edit-control/text-edit-control.schema';
import { PriorityTypeEnum } from '../../../enums/priority-type.enum';
import { WorkItemStateTypeEnum } from '../../../enums/state-type.enum';
import { WorkItemStatusTypeEnum } from '../../../enums/status-type.enum';
import { WorkItemTypeEnum } from '../../../enums/work-item-type.enum';

export interface ITaskEditSchema {
  formGroupName: string;
  title: ITextEditControlSchema;
  description: ITextEditControlSchema;
  priority: IComboEditControlSchema;
  type: IComboEditControlSchema;
  status: IComboEditControlSchema;
  state: IComboEditControlSchema;
}

export function getTaskEditSchema(): ITaskEditSchema {
  const id = _.uniqueId('taskEditGroup');

  return {
    formGroupName: id,
    title: {
      controlId: 'titleId' + id,
      formName: 'titleForm',
      fieldName: 'title',
      autofocus: true,
      //   translationKey: 'FEED.POST.LABEL.TITLE',
      placeholder: 'FEED.POST.LABEL.TITLE',
      minLength: 0,
      maxLength: 40,
    },
    description: {
      controlId: 'descriptionId' + id,
      formName: 'descriptionForm',
      fieldName: 'description',
      translationKey: 'FEED.POST.LABEL.DESCRIPTION',
      placeholder: 'FEED.POST.LABEL.DESCRIPTION',
      minLength: 0,
      maxLength: 4000,
    },
    priority: {
      controlId: 'priorityId' + id,
      formName: 'priorityForm',
      fieldName: 'priority',
      translationKey: 'Priority',
      options: [
        { translationKey: 'Low', value: PriorityTypeEnum.Low },
        { translationKey: 'Trivial', value: PriorityTypeEnum.Trivial },
        { translationKey: 'Medium', value: PriorityTypeEnum.Medium },
        { translationKey: 'High', value: PriorityTypeEnum.High },
        { translationKey: 'Critical', value: PriorityTypeEnum.Critical },
      ],
    },
    type: {
      controlId: 'typeId' + id,
      formName: 'typeForm',
      fieldName: 'type',
      translationKey: 'Type',
      options: [
        { translationKey: 'Bug', value: WorkItemTypeEnum.Bug },
        { translationKey: 'Feature', value: WorkItemTypeEnum.Feature },
        { translationKey: 'Hotfix', value: WorkItemTypeEnum.Hotfix },
        { translationKey: 'Story', value: WorkItemTypeEnum.Story },
      ],
    },
    status: {
      controlId: 'statusId' + id,
      formName: 'statusForm',
      fieldName: 'status',
      translationKey: 'Status',
      options: [
        { translationKey: 'Active', value: WorkItemStatusTypeEnum.Active },
        { translationKey: 'Closed', value: WorkItemStatusTypeEnum.Closed },
        { translationKey: 'Resolved', value: WorkItemStatusTypeEnum.Resolved },
        { translationKey: 'New', value: WorkItemStatusTypeEnum.New },
      ],
    },
    state: {
      controlId: 'stateId' + id,
      formName: 'stateForm',
      fieldName: 'state',
      translationKey: 'State',
      options: [
        { translationKey: 'For BA', value: WorkItemStateTypeEnum.ForBa },
        { translationKey: 'For Development', value: WorkItemStateTypeEnum.ForDevelopment },
        { translationKey: 'For Merge', value: WorkItemStateTypeEnum.ForMerge },
        { translationKey: 'For Testing', value: WorkItemStateTypeEnum.ForTesting },
        { translationKey: 'In Development', value: WorkItemStateTypeEnum.InDevelopment },
        { translationKey: 'In Testing', value: WorkItemStateTypeEnum.InTesting },
        { translationKey: 'Merged', value: WorkItemStateTypeEnum.Merged },
      ],
    },
  };
}
