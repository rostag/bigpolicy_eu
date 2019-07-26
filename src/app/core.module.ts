// CoreModule.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoggedInGuard } from './shared/login/logged-in.guard';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NguCarouselModule } from '@ngu/carousel';

@NgModule({
  imports: [
    HttpClientModule,
    RouterModule,
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    NguCarouselModule
  ],
  exports: [
    // components we want to make available
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    // components to use in this module
  ],
  providers: [
    // singleton services
    LoggedInGuard,
    HttpClientModule
  ]
})

export class CoreModule {

}
