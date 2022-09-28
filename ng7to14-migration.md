# Restore post-migration functionality

- re-import MaterialModule to BpModule
- check lazy loading

## re-install modules

- DONE @angular/fire - <https://github.com/angular/angularfire>

    TODO import {AngularFireDatabaseModule} from '@angular/fire/database';

- DONE flex-layout - npm i -s @angular/flex-layout @angular/cdk
- DONE @ngu/carousel
- "@angular/http": "7.2.3",
- "angular2-cookie-law": "7.0.1",
- DONE "@ngrx/effects"
- DONE "@ngrx/store"
- DONE "@ngrx/store-devtools"
- DONE npm install @auth0/angular-jwt (was angular2-jwt - was "angular2-jwt": "0.2.3")
- ? "firebase" module

## Type forms

<https://medium.com/angular-blog/angular-v14-is-now-available-391a6db736af>

Package "@angular-devkit/build-angular" has an incompatible peer dependency to "@angular/compiler-cli" (requires "^14.0.0" (extended), would install "13.3.11").
Package "@angular/http" has an incompatible peer dependency to "@angular/core" (requires "7.2.3" (extended), would install "13.3.11").

## GUIDE

You can run the optional migration for enabling production builds by default ng update @angular/cli@12 --migrate-only production-by-default.

Form models now require a generic type parameter. For gradual migration you can opt-out using the untyped version of the form model classes.
