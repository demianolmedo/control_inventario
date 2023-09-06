import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './paginas/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';



@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                children: [
                    { path: '', loadChildren: () => import('./paginas/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'materiales', loadChildren: () => import('./paginas/components/materiales/materiales.module').then(m => m.MaterialesModule) },
                    //{ path: 'mialmacen', loadChildren: () => import('./paginas/components/mialmacen/mialmacen.module').then(m => m.MialmacenModule) },
                    //{ path: 'enlaces', loadChildren: () => import('./paginas/components/enlaces/enlaces.module').then(m => m.EnlacesModule), canActivate:[RoleGuard], data: { expectedRole:  'TDI'} }
                ]
                ,canActivate:[AuthGuard]
            },
            { path: 'auth', loadChildren: () => import('./paginas/components/auth/auth.module').then(m => m.AuthModule) },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload', useHash: true })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
