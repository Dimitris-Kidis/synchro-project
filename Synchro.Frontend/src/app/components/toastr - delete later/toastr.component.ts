import { animate, style, transition, trigger } from '@angular/animations';
import { NgClass } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { Toast, ToasterService } from './toaster.service';

@Component({
  selector: 'synchro-toastr',
  standalone: true,
  imports: [NgClass],
  templateUrl: './toastr.component.html',
  styleUrl: './toastr.component.scss',
  animations: [
    trigger('toastAnimation', [
      transition(':enter', [
        style({ transform: 'translateY(100%)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'translateY(0)', opacity: 1 })),
      ]),
      transition(':leave', [animate('300ms ease-in', style({ transform: 'translateY(100%)', opacity: 0 }))]),
    ]),
  ],
})
export class ToastrComponent implements OnInit, OnDestroy {
  public toasts: Toast[] = [];

  private toasterService = inject(ToasterService);
  private subscription: Subscription;

  public ngOnInit(): void {
    this.subscription = this.toasterService.toasts$.subscribe((toasts) => (this.toasts = toasts));
  }

  public ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public removeToast(id: number): void {
    this.toasterService.remove(id);
  }
}
