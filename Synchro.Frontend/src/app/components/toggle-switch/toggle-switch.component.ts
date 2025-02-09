import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'synchro-toggle-switch',
  standalone: true,
  imports: [],
  templateUrl: './toggle-switch.component.html',
  styleUrl: './toggle-switch.component.scss',
})
export class ToggleSwitchComponent {
  @Input() public checked = true;
  @Output() public toggle = new EventEmitter<boolean>();

  public onToggle(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.toggle.emit(isChecked);
  }
}
