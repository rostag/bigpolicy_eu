import './polyfills.ts';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { AppModule } from './app/';
// FIXME import { LocalStorageService, LOCAL_STORAGE_SERVICE_CONFIG } from 'angular-2-local-storage';

/**
 * Application bootstrap, or entry point where it all starts
 */

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);

// WAS: (FIXME: CLEANUP)
// Create config options (see ILocalStorageServiceConfigOptions) for deets:
// let localStorageServiceConfig = {
//     prefix: 'bp-app',
//     storageType: 'sessionStorage'
// };

// Provide the config to the service:
// const LOCAL_STORAGE_CONFIG_PROVIDER: Provider = provide(LOCAL_STORAGE_SERVICE_CONFIG, {
//     useValue: localStorageServiceConfig
// });

// bootstrap(AppComponent, [
//   ...
//   // FIXME
//   LOCAL_STORAGE_CONFIG_PROVIDER,
//   APP_ROUTES_PROVIDER
// ]);
