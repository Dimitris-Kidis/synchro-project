import { Component, Input } from '@angular/core';
import { SizeOptions } from '../../enums/size-options';
import { DestroyBaseComponent } from '../destroy-base/destroy-base.component';

export type LoadingSize = 'tiny' | 'small' | 'medium' | 'large';

@Component({
  selector: 'synchro-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  standalone: true,
})
export class LoadingComponent extends DestroyBaseComponent {
  public size: string = SizeOptions.medium;

  public constructor() {
    super();
  }

  @Input() public set loaderSize(value: LoadingSize) {
    this.size = SizeOptions[value];
  }
}
