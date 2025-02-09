import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'synchro-empty-list',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './empty-list.component.html',
  styleUrl: './empty-list.component.scss',
})
export class EmptyListComponent {
  @Input() public imageName: string = 'not-found.png';
  @Input() public width: string = '100px';
  @Input() public translationPlaceholderKey: string = 'COMMON.LIST.EMPTY';
}
