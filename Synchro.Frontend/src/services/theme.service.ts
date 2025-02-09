import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  public themeSignal = signal<string>('light');

  // public setTheme(theme: string): void {
  //   this.themeSignal.set(theme);
  // }

  // public updateTheme(): void {
  //   this.themeSignal.update((value) => (value === 'dark' ? 'light' : 'dark'));
  //   document.body.setAttribute('data-theme', this.themeSignal());
  // }
  public constructor() {
    // Инициализация темы из localStorage при загрузке приложения
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    if (savedTheme) {
      this.themeSignal.set(savedTheme);
      document.body.setAttribute('data-theme', savedTheme);
    } else {
      // Если тема не сохранена, устанавливаем тему по умолчанию
      this.themeSignal.set('dark');
      document.body.setAttribute('data-theme', 'dark');
    }
  }

  // Метод для изменения темы
  public setTheme(theme: string): void {
    this.themeSignal.set(theme);
    localStorage.setItem('theme', theme); // Сохраняем выбранную тему в localStorage
    document.body.setAttribute('data-theme', theme); // Применяем тему
  }

  // Метод для переключения между светлой и тёмной темой
  public updateTheme(): void {
    const newTheme = this.themeSignal() === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme); // Используем setTheme для сохранения и применения новой темы
  }
}
