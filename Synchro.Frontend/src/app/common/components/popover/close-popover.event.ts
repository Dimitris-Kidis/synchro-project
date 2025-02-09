import { SynchroEvent } from '../../services/synchro-event';

export class ClosePopoverEvent extends SynchroEvent {
  public constructor(public groupName?: string | null) {
    super();
  }

  public getKey(): string {
    return 'closePopoverEvent.close';
  }
}
