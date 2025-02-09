import * as _ from 'lodash-es';
import { ICheckboxEditControlSchema } from '../../../common/controls/checkbox/checkbox-edit-control/checkbox-edit-control.schema';
import { CheckboxType } from '../../../common/controls/checkbox/checkbox-view-control/checkbox-type';
import { ICheckboxViewControlSchema } from '../../../common/controls/checkbox/checkbox-view-control/checkbox-view-control.schema';
import { IComboEditControlSchema } from '../../../common/controls/combo-edit-control/combo-edit-control.schema';
import { ITextEditControlSchema } from '../../../common/controls/text-edit-control/text-edit-control.schema';
import { AudienceTypeEnum } from '../../../enums/audience-type.enum';

export interface IPostEditSchema {
  formGroupName: string;
  title: ITextEditControlSchema;
  description: ITextEditControlSchema;
  content: ITextEditControlSchema;
  audienceType: IComboEditControlSchema;
  isAuthorVisible: ICheckboxEditControlSchema & ICheckboxViewControlSchema;
}

export function getPostEditSchema(): IPostEditSchema {
  const id = _.uniqueId('postEditGroup');

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
    content: {
      controlId: 'contentId' + id,
      formName: 'contentForm',
      fieldName: 'content',
      translationKey: 'FEED.POST.LABEL.CONTENT',
      placeholder: 'FEED.POST.LABEL.CONTENT',
      maxLength: 4000,
    },
    audienceType: {
      controlId: 'audienceTypeId' + id,
      formName: 'audienceTypeForm',
      fieldName: 'audienceType',
      translationKey: 'FEED.POST.LABEL.AUDIENCE_TYPE',
      options: [
        { translationKey: 'FEED.AUDIENCE_TYPE.ALL', value: AudienceTypeEnum.All },
        { translationKey: 'FEED.AUDIENCE_TYPE.STUDENTS', value: AudienceTypeEnum.Students },
        { translationKey: 'FEED.AUDIENCE_TYPE.MANAGERS', value: AudienceTypeEnum.Managers },
        { translationKey: 'FEED.AUDIENCE_TYPE.ADMINS', value: AudienceTypeEnum.Admins },
      ],
    },
    isAuthorVisible: {
      controlId: 'isAuthorVisibleId' + id,
      formName: 'isAuthorVisibleForm',
      fieldName: 'isAuthorVisible',
      translationKey: 'FEED.POST.LABEL.IS_AUTHOR_VISIBLE',
      checkboxType: CheckboxType.ViewBoolean,
    },
  };
}
