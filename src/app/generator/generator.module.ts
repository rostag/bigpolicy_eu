import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneratorRoutingModule } from './generator-routing.module';
import { GeneratorComponent } from './generator.component';
import { AudioComponent } from './audio.component';

@NgModule({
  imports: [
    CommonModule,
    GeneratorRoutingModule
  ],
  declarations: [
    GeneratorComponent,
    AudioComponent
  ]
})
export class GeneratorModule { }
