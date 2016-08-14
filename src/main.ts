import { bootstrap } from '@angular/platform-browser-dynamic';
import { provideRouter } from '@angular/router';
import { HTTP_PROVIDERS } from '@angular/http';
import { enableProdMode } from '@angular/core';
import { AppComponent, environment } from './app/';
import { APP_ROUTES_PROVIDER } from './app/app.routes';
import { UserService } from './app/shared/user/user.service';
import { LoggedInGuard } from './app/shared/login/logged-in.guard';

/**
 * Application bootstrap, or entry point where it all starts
 */

if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent, [
  UserService,
  LoggedInGuard,
  HTTP_PROVIDERS,
  APP_ROUTES_PROVIDER
]);
