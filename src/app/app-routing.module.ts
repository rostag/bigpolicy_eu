import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// The order of routes is important. More specific come first.
const routes: Routes = [
  { path: 'generator', loadChildren: 'app/generator/generator.module#GeneratorModule' },
  { path: '', loadChildren: 'app/bp.module#BpModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
