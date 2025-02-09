import { NgClass, NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'synchro-divider',
  standalone: true,
  imports: [NgClass, NgStyle],
  templateUrl: './divider.component.html',
  styleUrl: './divider.component.scss',
})
export class DividerComponent {
  @Input() public direction: 'horizontal' | 'vertical' = 'horizontal'; // to do enum
  @Input() public size: 'small' | 'medium' | 'large' | 'x-large' | 'xx-large' = 'medium';

  public get dividerClass(): string {
    return `${this.direction} ${this.size}`;
  }
}
