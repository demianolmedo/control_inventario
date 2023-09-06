import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialesComponent } from './materiales.component';
import { MaterialesRoutingModule } from './materiales-routing.module';

import { TabViewModule } from 'primeng/tabview';

import { CalendarModule } from 'primeng/calendar';



@NgModule({
  declarations: [MaterialesComponent],
  imports: [
    CommonModule,
    MaterialesRoutingModule,
    TabViewModule,
    CalendarModule
  ]
})
export class MaterialesModule { }



