import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageTogglerComponent } from '../language-toggler/language-toggler.component';
import { ThemeSwitchComponent } from '../theme-switch/theme-switch.component';

@Component({
  selector: 'synchro-header',
  standalone: true,
  imports: [RouterModule, TranslateModule, LanguageTogglerComponent, NgClass, ThemeSwitchComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public currentRoute: string;

  public constructor(private router: Router, private route: ActivatedRoute) {
    this.currentRoute = this.router.url.split('/')[1];
  }

  public checkRoute(route: string): boolean {
    return this.currentRoute === route;
  }
}
