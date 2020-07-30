import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GeneratorRoutingModule} from './generator-routing.module';
import {GeneratorComponent} from './generator.component';
import {AudioComponent} from './audio.component';
import {MaterialModule} from '../shared/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CNewsComponent } from './components/c-news/c-news.component';
import { PoetryComponent } from './components/poetry/poetry.component';

@NgModule({
  imports: [
    CommonModule,
    GeneratorRoutingModule,
    MaterialModule,
    FlexLayoutModule,
  ],
  declarations: [
    GeneratorComponent,
    AudioComponent,
    CNewsComponent,
    PoetryComponent
  ]
})
export class GeneratorModule {
}
