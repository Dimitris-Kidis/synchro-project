import { ApplicationConfig, importProvidersFrom, inject, provideAppInitializer } from '@angular/core';
import { provideRouter } from '@angular/router';

import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { QuillModule } from 'ngx-quill';
import { ToastrModule, provideToastr } from 'ngx-toastr';
import { CurrentUserProvider } from '../providers/current-user.provider';
import { SignalRService } from '../services/signalr.service';
import { routes } from './app.routes';
import { PageSpinnerModule } from './common/components/page-spinner/page-spinner.module';
import { NgOnDestroy } from './common/services/ng-on-destroy.service';
import { TRANSLATE_CONFIG } from './core/configs/translate.config';
import { DateAttributesInterceptor } from './core/interceptors/date-attributes.interceptor';
import { TokenInterceptor } from './core/interceptors/token.interceptor';
import { StoreModule } from './store/store.module';

export function initializeUser(currentUserProvider: CurrentUserProvider) {
  return () => currentUserProvider.init();
}

export function initializeSignalR(signalRService: SignalRService) {
  return () => signalRService.init();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideToastr(),
    provideAnimations(),
    importProvidersFrom(ToastrModule.forRoot()),
    importProvidersFrom(StoreModule),
    importProvidersFrom(PageSpinnerModule),
    importProvidersFrom(TranslateModule.forRoot(TRANSLATE_CONFIG)),
    importProvidersFrom(QuillModule.forRoot()),
    // importProvidersFrom(NgxMaterialTimepickerModule.setLocale('en')),
    NgOnDestroy,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: DateAttributesInterceptor,
      multi: true,
    },
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    provideAppInitializer(() => {
        const initializerFn = (initializeUser)(inject(CurrentUserProvider));
        return initializerFn();
      }),
    provideAppInitializer(() => {
        const initializerFn = (initializeSignalR)(inject(SignalRService));
        return initializerFn();
      }),
  ],
};
