import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { Router } from '@angular/router';
import decode from 'jwt-decode';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    items!: MenuItem[];

    msgtoast: any="";
    token: any="";
    token1: any="";
    token2: any="";
    DESCRIPTION: any="";
    PLATAFORMA: any="";
    UNIDAD: any="";
    NOM_SUPERVISOR: any="";
    area: any="";
    plat: any="";
    outc: any="";

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(
      public layoutService: LayoutService,
      private router: Router) {

        this.token = decode(localStorage.getItem('token')  || '{}');
        this.token1 = JSON.stringify(this.token);
        this.token2 = JSON.parse(this.token1);
        this.DESCRIPTION = this.token2.data.DESCRIPTION;
        this.PLATAFORMA = this.token2.data.PLATAFORMA;
        this.NOM_SUPERVISOR = this.token2.data.NOM_SUPERVISOR;
        this.UNIDAD = this.token2.data.UNIDAD;
        this.area = this.token2.data.area;
        console.log(this.token2)

      }

    Logout(){
      localStorage.removeItem('token');
      this.router.navigate(['/auth/login'])
    }
}
