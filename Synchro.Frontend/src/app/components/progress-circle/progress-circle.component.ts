import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'synchro-progress-circle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress-circle.component.html',
  styleUrl: './progress-circle.component.scss',
})
export class ProgressCircleComponent {
  @Input() public correctPercentage: number = 0;
  @Input() public displayPercents: boolean = false;
  @Input() public lowerBorder: number = 50;
  @Input() public correctColor: string = 'var(--t-c-accent)';
  @Input() public incorrectColor: string = 'var(--t-c-error)';
  @Input() public size: 'small' | 'medium' | 'large' | 'x-large' | 'xx-large' = 'medium';

  public get textColor(): string {
    return this.correctPercentage >= this.lowerBorder ? this.correctColor : this.incorrectColor;
  }

  public get conicGradient(): string {
    const correctAngle = (this.correctPercentage / 100) * 360;
    return `conic-gradient(
      ${this.correctColor} 0deg ${correctAngle}deg, 
      ${this.incorrectColor} ${correctAngle}deg 360deg
    )`;
  }
}
