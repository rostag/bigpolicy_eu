import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../shared/material/material.module';
import { AudioComponent } from './components/audio/audio.component';
import { CNewsComponent } from './components/c-news/c-news.component';
import { GeneratorComponent } from './components/generator/generator.component';
import { PoetryComponent } from './components/poetry/poetry.component';
import { RandomDomComponent } from './components/random-dom/random-dom.component';
import { GeneratorRoutingModule } from './generator-routing.module';

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
    PoetryComponent,
    RandomDomComponent,
  ]
})
export class GeneratorModule {
}
