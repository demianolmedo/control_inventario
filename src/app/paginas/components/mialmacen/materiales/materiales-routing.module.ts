import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialesComponent } from './materiales.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: MaterialesComponent }
	])],
	exports: [RouterModule]
})
export class MaterialesRoutingModule { }



