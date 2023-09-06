import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


@NgModule({
  imports: [RouterModule.forChild([
    { path: 'items', data: { breadcrumb: 'Materiales - Items' }, loadChildren: () => import('./items/items.module').then(m => m.ItemsModule) },
    { path: 'compras/:titulo', data: { breadcrumb: 'Materiales - Compras' }, loadChildren: () => import('./compras/compras.module').then(m => m.ComprasModule) },
    { path: 'proveedores', data: { breadcrumb: 'Materiales - Proveedores' }, loadChildren: () => import('./proveedores/proveedores.module').then(m => m.ProveedoresModule) },
    { path: '**', redirectTo: '/notfound' }
])],
  exports: [RouterModule]
})
export class MaterialesRoutingModule { }









