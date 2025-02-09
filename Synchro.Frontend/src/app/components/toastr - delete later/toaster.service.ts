import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  public toasts: Toast[] = [];
  public tosastSubject = new BehaviorSubject<Toast[]>([]);

  public toasts$ = this.tosastSubject.asObservable();

  public remove(id: number): void {
    this.toasts = this.toasts.filter((t) => t.id !== id);
    this.tosastSubject.next(this.toasts);
  }

  public show(title: string, message: string, type: 'success' | 'error' | 'info' | 'warning'): number {
    const id = Date.now();
    const toast: Toast = { id, title, message, type };
    this.toasts.push(toast);
    this.tosastSubject.next(this.toasts);
    setTimeout(() => {
      this.remove(id);
    }, 3000);

    return id;
  }

  public success(title: string, message: string): number {
    return this.show(title, message, 'success');
  }
}

export interface Toast {
  id: number;
  title: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}
