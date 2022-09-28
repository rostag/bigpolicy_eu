import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { AudioComponent } from './components/audio/audio.component';
import { CNewsComponent } from './components/c-news/c-news.component';
import { GeneratorComponent } from './components/generator/generator.component';
import { PoetryXComponent } from './components/poetry-x/poetry-x.component';
import { PoetryComponent } from './components/poetry/poetry.component';
import { PoetryService } from './components/services/poetry.service';
import { GeneratorRoutingModule } from './generator-routing.module';

@NgModule({
  imports: [
    CommonModule,
    GeneratorRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule,
  ],
  declarations: [
    GeneratorComponent,
    AudioComponent,
    CNewsComponent,
    PoetryXComponent,
    PoetryComponent,
  ],
  providers: [
    PoetryService
  ]
})
export class GeneratorModule {
}
