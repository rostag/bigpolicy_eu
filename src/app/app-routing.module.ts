import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// The order of routes is important. More specific come first.
const routes: Routes = [
  { path: 'generator', loadChildren: () => import('./generator/generator.module').then(m => m.GeneratorModule) },
  { path: '', loadChildren: () => import('./bp.module').then(m => m.BpModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
