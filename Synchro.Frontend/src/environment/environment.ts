export const environment = {
  production: false,
  angularUrl: 'http://localhost:4200',
  synchroBaseUrl: 'http://localhost:4200',
  userIdClaimKey: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier',
  redirectAfterAuthUrl: '/dashboard',
  redirectToRegisterAuthUrl: '/register',
  redirectToLoginAuthUrl: '/login',
  localStorageLocaleVariableName: 'synchro-locale',
  defaultLanguage: 'en',
  currentLanguageLabel: 'English',
  secretKeyHiddenFormat: '***-***-***',
  languages: [
    { code: 'en', label: 'English' },
    { code: 'ru', label: 'Русский' },
    { code: 'ro', label: 'Română' },
  ],
};
