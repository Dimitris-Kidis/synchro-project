import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ThemeService } from '../../../services/theme.service';
import { IconsModule } from '../../icons/icons.module';
import { ToggleSwitchComponent } from '../toggle-switch/toggle-switch.component';

@Component({
  selector: 'synchro-theme-switch',
  standalone: true,
  imports: [ToggleSwitchComponent, MatIconModule, FontAwesomeModule, IconsModule],
  templateUrl: './theme-switch.component.html',
  styleUrl: './theme-switch.component.scss',
})
export class ThemeSwitchComponent {
  public themeService: ThemeService = inject(ThemeService);
  public isSwitchOn: boolean = this.themeService.themeSignal() === 'dark';

  public onSwitchToggle(state: boolean): void {
    this.isSwitchOn = state;
    this.themeService.setTheme(state ? 'dark' : 'light');
  }
}
