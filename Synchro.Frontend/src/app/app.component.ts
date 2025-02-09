import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PageTitleService } from './common/services/page-title.service';
import { LayoutModule } from './components/layout/layout.module';
import { NotificationModalModule } from './components/notification-modal/notification-modal.module';
import { SharedModule } from './shared/shared.module';

@Component({
  selector: 'synchro-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SharedModule, NotificationModalModule, LayoutModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  public constructor(private readonly pageTitle: PageTitleService) {}

  public ngOnInit(): void {
    this.pageTitle.init();
  }
}
