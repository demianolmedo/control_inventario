import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

@NgModule({
  imports: [RouterModule.forChild([
    { path: 'materiales', data: { breadcrumb: 'Mi Almacen - Meteriales' }, loadChildren: () => import('./materiales/materiales.module').then(m => m.MaterialesModule) },
    { path: '**', redirectTo: '/notfound' }
])],
  exports: [RouterModule]
})
export class MialmacenRoutingModule { }









