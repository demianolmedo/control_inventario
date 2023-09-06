import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProveedoresComponent } from './proveedores.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ProveedoresComponent }
	])],
	exports: [RouterModule]
})
export class ProveedoresRoutingModule { }



