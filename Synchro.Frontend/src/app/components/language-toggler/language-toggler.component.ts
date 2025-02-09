import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../../environment/environment';

@Component({
  selector: 'synchro-language-toggler',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './language-toggler.component.html',
  styleUrl: './language-toggler.component.scss',
})
export class LanguageTogglerComponent implements OnInit {
  public defaultLanguage = environment.defaultLanguage;
  public currentLanguageLabel: string = environment.currentLanguageLabel;
  public availableLanguages = environment.languages;

  public constructor(public translateService: TranslateService) {}

  public ngOnInit(): void {
    const savedLanguage = localStorage.getItem(environment.localStorageLocaleVariableName);
    const languageIsoCode: string = savedLanguage || this.defaultLanguage;

    this.translateService.setDefaultLang(languageIsoCode);
    this.availableLanguages = environment.languages.filter((lang) => lang.code !== languageIsoCode);
    this.currentLanguageLabel =
      environment.languages.find((lang) => lang.code === languageIsoCode)?.label || environment.currentLanguageLabel;
  }

  public changeLanguage(lang: string): void {
    localStorage.setItem(environment.localStorageLocaleVariableName, lang);
    this.translateService.use(lang);
    this.availableLanguages = environment.languages.filter((language) => language.code !== lang);
    this.currentLanguageLabel =
      environment.languages.find((language) => language.code === lang)?.label || environment.currentLanguageLabel;
  }
}
