import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GeneratorRoutingModule} from './generator-routing.module';
import {GeneratorComponent} from './generator.component';
import {AudioComponent} from './audio.component';
import {MaterialModule} from '../shared/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    GeneratorRoutingModule,
    MaterialModule,
    FlexLayoutModule,
  ],
  declarations: [
    GeneratorComponent,
    AudioComponent
  ]
})
export class GeneratorModule {
}
