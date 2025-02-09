import { SynchroEvent } from './synchro-event';

export class OverridePageTitleEvent extends SynchroEvent {
  public pageTitle: string;

  public constructor(pageTitle: string) {
    super();
    this.pageTitle = pageTitle;
  }

  public getKey(): string {
    return 'OverridePageTitleEvent';
  }
}
