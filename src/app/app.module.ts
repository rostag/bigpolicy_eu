import { AppComponent } from './app.component';
import { CoreModule } from './core.module';
import { NgModule } from '@angular/core';
import { routing } from './app.routes';

@NgModule({
  imports: [
    CoreModule,
    routing
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
