import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppComponent, environment } from './app/';
import { HTTP_PROVIDERS } from '@angular/http';
import { provideRouter } from '@angular/router';

import { AboutComponent } from './app/about/index';
import { LandingComponent } from './app/landing/index';
import { EditLeaderComponent } from './app/leader/edit/index';

if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent, [
  HTTP_PROVIDERS
  ,
  provideRouter([
    { index: true, component: LandingComponent },
    { path: '/about', component: AboutComponent },
    { path: '/add-leader', component: EditLeaderComponent }
  ])
]);
