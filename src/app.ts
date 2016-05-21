import {bootstrap} from '@angular/platform-browser';
import {HTTP_PROVIDERS} from '@angular/http';
import {ROUTER_PROVIDERS} from '@angular/router-deprecated';

import {SeedApp} from './app/seed-app';

bootstrap(SeedApp, [HTTP_PROVIDERS, ROUTER_PROVIDERS])
  .catch(err => console.error(err));
