import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { routing } from './app.routes';

// provides services, components etc
import { CoreModule } from './core.module';

@NgModule({
  imports: [
    routing,
    CoreModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
