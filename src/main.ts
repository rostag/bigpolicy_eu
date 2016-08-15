import { bootstrap } from '@angular/platform-browser-dynamic';
import { provideRouter } from '@angular/router';
import { HTTP_PROVIDERS } from '@angular/http';
import { enableProdMode, Provider, provide } from '@angular/core';
import { AppComponent, environment } from './app/';
import { APP_ROUTES_PROVIDER } from './app/app.routes';
import { UserService } from './app/shared/user/user.service';
import { LoggedInGuard } from './app/shared/login/logged-in.guard';
import { LocalStorageService, LOCAL_STORAGE_SERVICE_CONFIG } from 'angular-2-local-storage';

/**
 * Application bootstrap, or entry point where it all starts
 */

if (environment.production) {
  enableProdMode();
}

// Create config options (see ILocalStorageServiceConfigOptions) for deets:
let localStorageServiceConfig = {
    prefix: 'bp-app',
    storageType: 'sessionStorage'
};
// Provide the config to the service:
const LOCAL_STORAGE_CONFIG_PROVIDER: Provider = provide(LOCAL_STORAGE_SERVICE_CONFIG, {
    useValue: localStorageServiceConfig
});

bootstrap(AppComponent, [
  UserService,
  LoggedInGuard,
  LocalStorageService,
  LOCAL_STORAGE_CONFIG_PROVIDER,
  HTTP_PROVIDERS,
  APP_ROUTES_PROVIDER
]);
