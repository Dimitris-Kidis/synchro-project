import * as _ from 'lodash-es';
import { IDateEditControlSchema } from '../../../common/controls/date-edit-control/date-edit-control.schema';
import { ITextEditControlSchema } from '../../../common/controls/text-edit-control/text-edit-control.schema';

export interface IEventEditSchema {
  formGroupName: string;
  title: ITextEditControlSchema;
  description: ITextEditControlSchema;
  startDateTime: IDateEditControlSchema;
}

export function getEventEditSchema(): IEventEditSchema {
  const id = _.uniqueId('eventEditGroup');

  return {
    formGroupName: id,
    title: {
      controlId: 'titleId' + id,
      formName: 'titleForm',
      fieldName: 'title',
      autofocus: true,
      translationKey: 'FEED.POST.LABEL.TITLE',
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
      maxLength: 200,
    },
    startDateTime: {
      controlId: 'startDateTimeId' + id,
      formName: 'startDateTimeForm',
      fieldName: 'startDateTime',
      translationKey: 'FEED.POST.LABEL.DESCRIPTION',
      placeholder: 'FEED.POST.LABEL.DESCRIPTION',
    },
  };
}
