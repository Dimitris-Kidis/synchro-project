import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RequestDto } from '../../../../commands/requests-commands';
import { RequestItemComponent } from '../request-item/request-item.component';

@Component({
  selector: 'synchro-requests-view',
  standalone: true,
  imports: [RequestItemComponent, TranslateModule],
  templateUrl: './requests-view.component.html',
  styleUrl: './requests-view.component.scss',
})
export class RequestsViewComponent {
  @Input({ required: true }) public requests: RequestDto[];
  @Output() public refreshRequests = new EventEmitter<void>();

  public refresh(): void {
    this.refreshRequests.emit();
  }
}
