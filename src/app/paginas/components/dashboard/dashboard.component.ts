import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';

import { Table } from 'primeng/table';
import { SgmService } from 'src/app/paginas/service/sgm.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import decode from 'jwt-decode';

import { Location } from '@angular/common';

import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';




@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {

    loading: boolean = true;
    loadingApro: boolean = true;
    compras: any[] = [];
    comprasPend: any[] = [];
    comprasPendTabla: any[] = [];
    comprasRech: any[] = [];
    comprasApro: any[] = [];
    comprasAproTabla: any[] = [];
    comprasPendJefa: any="";
    comprasPendGere: any="";
    comprasAproJefa: any="";
    comprasAproGere: any="";
    comprasRechJefa: any="";
    comprasRechGere: any="";
    comprasTotal: any="";

    chartData: any;
    chartOptions: any;

    token: any="";
    token1: any="";
    token2: any="";
    DESCRIPTION: any="";
    id_login: any="";
    departamento: any="";
    region: any="";

    statusForms: FormGroup;
    desembolsoForms: FormGroup;
    descargoForms: FormGroup;
    calidadForms: FormGroup;

    display: boolean = false;
    displayAprobar: boolean = false;
    displayRechazar: boolean = false;
    displayEliminar: boolean = false;
    displayDesembolso: boolean = false;
    displayDescargo: boolean = false;
    displayCalidad: boolean = false;
    CompraProveedor: string='';
    CompraItem: string='';
    CompraCantidad: string='';
    CompraUnidadmedida: string='';
    CompraPrecioUnidad: string='';
    CompraPrecioTotal: string='';
    CompraMedida: string='';
    CompraObservaciones: string='';
    CompraRegional: string='';
    CompraCodigo: string='';
    CompraSolicitante: string='';
    CompraDepartamento_j: any[]=[];
    CompraFechaSol: string='';
    CompraJefatura: string='';
    CompraGerencia: string='';
    CompraMarca: string='';
    CompraPresentacionItem: string='';
    CompraCantidadTotal: string='';
    CompraFechaSolicita: string='';
    CompraFechaJefatura: string='';
    CompraFechaGerencia: string='';
    CompraFechaDesembolso: string='';;
    CompraNComprobante: string='';;
    CompraFechaDescargo: string='';;
    CompraCalidad: string='';
    CompraDepatamentos: any[]=[];

    jefatura: string="";
    gerencia: string="";
    areaS: string="";


    constructor(
      private _sgmService: SgmService,
      private router: Router,
      private fb: FormBuilder,
      private route: ActivatedRoute,
      private location: Location,
      private datePipe: DatePipe
    ) {


      this.token = decode(localStorage.getItem('token')  || '{}');
      this.token1 = JSON.stringify(this.token);
      this.token2 = JSON.parse(this.token1);
      this.DESCRIPTION = this.token2.data.DESCRIPTION;
      this.id_login = this.token2.data.USER_ID;
      this.departamento = this.token2.data.L2_DEPARTAMENTO;

      this.departamentoNombre(this.departamento)

      this.statusForms = this.fb.group({
        observacion: ['', Validators.required],
      })

      this.desembolsoForms = this.fb.group({
        fecha_manual: ['', Validators.required],
        comprobante: ['', Validators.required]
      })

      this.descargoForms = this.fb.group({
        fecha_manual: ['', Validators.required],
      })

      this.calidadForms = this.fb.group({
        fechaProgCalidad: ['', Validators.required],
        obsCalidad: ['', Validators.required],
      })

    }

    ngOnInit() {
        // this.initChart();

        setTimeout(() => {
          this.ObtenerComprasPenTabla({estado:'Pendientes'});
        }, 100);

        setTimeout(() => {
          this.ObtenerComprasAproTabla({estado:'Aprobados'});
        }, 2000);

        setTimeout(() => {
          this.ObtenerComprasLista({estado:'Pendientes'});
        }, 3000);

        setTimeout(() => {
          this.ObtenerComprasLista({estado:'Aprobados'});
        }, 4000);
        setTimeout(() => {
          this.ObtenerComprasLista({estado:'Rechazados'});
        }, 5000);




    }



    departamentoNombre(depa:any){
      if(depa==1){this.region="LA PAZ"}
      if(depa==2){this.region="SANTA CRUZ"}
      if(depa==3){this.region="COCHABAMBA"}
      if(depa==4){this.region="ORURO"}
      if(depa==5){this.region="POTOSI"}
      if(depa==6){this.region="TARIJA"}
      if(depa==7){this.region="BENI"}
      if(depa==8){this.region="PANDO"}
      if(depa==9){this.region="CHUQUISACA"}
    }

    ObtenerComprasLista(datos: any){
      this._sgmService.apiObtenerComprasLista(datos).subscribe(data => {

        if(datos.estado=='Pendientes'){
          this.comprasPend = data;
          this.comprasPendJefa = this.contadorStatus('jefatura','Pendiente', data);
          this.comprasPendGere = this.contadorStatus('gerencia','Pendiente', data);
        }
        if(datos.estado=='Aprobados'){
          this.comprasApro = data;
          this.comprasAproJefa = this.contadorStatus('jefatura','Aprobado', data);
          this.comprasAproGere = this.contadorStatus('gerencia','Aprobado', data);
        }
        if(datos.estado=='Rechazados'){
          this.comprasRech = data;
          this.comprasRechJefa = this.contadorStatus('jefatura','Rechazado', data);
          this.comprasRechGere = this.contadorStatus('gerencia','Rechazado', data);
        }


        }, error => {
        console.log(error);
        localStorage.removeItem('token');
        this.router.navigateByUrl('/auth/login')
      });
    }

    ObtenerComprasPenTabla(datos: any){
      this._sgmService.apiObtenerComprasLista(datos).subscribe(dataP => {
        this.comprasPendTabla = dataP;
        this.loading = false;
        }, error => {
        console.log(error);
        localStorage.removeItem('token');
        this.router.navigateByUrl('/auth/login')
      });
    }

    ObtenerComprasAproTabla(datos: any){
      this._sgmService.apiObtenerComprasLista(datos).subscribe(dataA => {
        this.comprasAproTabla = dataA;
        this.loadingApro = false;
        }, error => {
        console.log(error);
        localStorage.removeItem('token');
        this.router.navigateByUrl('/auth/login')
      });
    }

    onGlobalFilter(table: Table, event: Event) {
      table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }




    mostrarDetalle(datos:any){
      this.display = true;

      this.CompraProveedor=datos.razonSocial;
      this.CompraItem=datos.item;
      this.CompraCantidad=datos.cantidadCompra;
      this.CompraUnidadmedida=datos.medidaCompra;
      this.CompraPrecioUnidad=datos.precioUnitarioCompra;
      this.CompraPrecioTotal=datos.precioTotalCompra;
      this.CompraMedida=datos.presentacionMedida;
      this.CompraObservaciones=datos.observacion;
      this.CompraRegional=datos.departamento_solicita;
      this.CompraCodigo=datos.codigoCompra;
      this.CompraSolicitante=datos.nombre_solicita;
      this.CompraDepartamento_j=datos.departamentos_j
      this.CompraFechaSol=datos.fecha_solicita;
      this.CompraJefatura=datos.jefatura;
      this.CompraGerencia=datos.gerencia;
      this.CompraFechaDesembolso=datos.fecha_desembolso;
      this.CompraNComprobante=datos.nro_comprobante;
      this.CompraFechaDescargo=datos.fecha_descargo;
      this.CompraMarca=datos.marca;
      this.CompraCalidad=datos.calidadCompletado;
      this.CompraPresentacionItem=datos.presentacionItem;
      this.CompraCantidadTotal=datos.cantidadTotal;
      this.CompraFechaSolicita=datos.fecha_solicita;
      this.CompraFechaJefatura=datos.fecha_jefatura;
      this.CompraFechaGerencia=datos.fecha_gerencia;
    }

    mostrarDetalleAprobar(datos:any){
      this.statusForms.reset();
      this.displayAprobar = true;
      this.CompraCodigo=datos.codigoCompra;
      this.jefatura=datos.jefatura;
      this.gerencia=datos.gerencia;
    }

    mostrarDetalleRechazar(datos:any){
      this.statusForms.reset();
      this.displayRechazar = true;
      this.CompraCodigo=datos.codigoCompra;
    }

    mostrarDetalleEliminar(datos:any){
      this.statusForms.reset();
      this.displayEliminar = true;
      this.CompraCodigo=datos.codigoCompra;
    }

    mostrarDesembolso(datos:any){
      this.desembolsoForms.reset();
      this.displayDesembolso = true;
      this.CompraCodigo=datos.codigoCompra;
      this.CompraFechaDesembolso=datos.fecha_desembolso;
      this.CompraNComprobante=datos.nro_comprobante;
    }

    mostrarDescargo(datos:any){
      this.descargoForms.reset();
      this.displayDescargo = true;
      this.CompraCodigo=datos.codigoCompra;
      this.CompraFechaDescargo=datos.fecha_descargo;
    }

    mostrarCalidad(datos:any){
      this.calidadForms.reset();
      this.displayCalidad = true;
      this.CompraCodigo=datos.codigoCompra;
      this.CompraDepatamentos=datos.departamentos_j;
    }

    contadorStatus(campo:any, status:any, data:any){
      if (campo=='jefatura'){const objetosFiltrados = data.filter((objeto: { jefatura: any; }) => objeto.jefatura === status); return objetosFiltrados.length;}
      if (campo=='gerencia'){const objetosFiltrados = data.filter((objeto: { gerencia: any; }) => objeto.gerencia === status); return objetosFiltrados.length;}

    }

    cancelar(){
      this.displayAprobar=false;
      this.displayRechazar=false;
      this.displayEliminar=false;
      this.displayDesembolso=false;
      this.displayDescargo=false;
      this.displayCalidad=false;
      this.statusForms.reset();
      this.desembolsoForms.reset();
      this.descargoForms.reset();
    }



    rechazar(){
      if(this.jefatura=='Pendiente'){this.areaS='jefatura'}else{this.areaS='gerencia'}
      const datosStatus: any = {
        codigoCompra: this.CompraCodigo,
        area: this.areaS,
        status: "Rechazado",
        login: this.id_login,
        nombre: this.DESCRIPTION ,
        fecha: this.fechaRegistro(),
        obs: this.statusForms.get('observacion')?.value
      };
      this.displayRechazar=false;
      this.guardaStatusCompra(datosStatus);
    }

    aprobar(){
      if(this.jefatura=='Pendiente'){this.areaS='jefatura'}else{this.areaS='gerencia'}
      const datosStatus: any = {
        codigoCompra: this.CompraCodigo,
        area: this.areaS,
        status: "Aprobado",
        login: this.id_login,
        nombre: this.DESCRIPTION ,
        fecha: this.fechaRegistro(),
        obs: this.statusForms.get('observacion')?.value
      };
      this.displayAprobar=false;
      this.guardaStatusCompra(datosStatus);
    }

    eliminar(){
      const datosStatus: any = {
        codigoCompra: this.CompraCodigo,
        area: "elimina",
        status: "0",
        login: this.id_login,
        nombre: this.DESCRIPTION ,
        fecha: this.fechaRegistro(),
        obs: this.statusForms.get('observacion')?.value
      };
      this.displayEliminar=false;
      this.guardaStatusCompra(datosStatus);
    }

    guardaDesembolso(){
      const formattedDate = this.datePipe.transform(this.desembolsoForms.get('fecha_manual')?.value, 'yyyy-MM-dd');
      const datosDesembolso: any = {
        codigoCompra: this.CompraCodigo,
        tipo: "desembolso",
        login: this.id_login,
        nombre: this.DESCRIPTION ,
        fecha: this.fechaRegistro(),
        fecha_manual: formattedDate,
        comprobante: this.desembolsoForms.get('comprobante')?.value
      };
      this.displayDesembolso=false;
      console.log(datosDesembolso)
      this.guardaDesembolsoDescarga(datosDesembolso);

    }

    guardaDescargo(){
      const formattedDate = this.datePipe.transform(this.descargoForms.get('fecha_manual')?.value, 'yyyy-MM-dd');
      const datosDescargo: any = {
        codigoCompra: this.CompraCodigo,
        tipo: "descargo",
        login: this.id_login,
        nombre: this.DESCRIPTION ,
        fecha: this.fechaRegistro(),
        fecha_manual: formattedDate,
        comprobante: ""
      };
      this.displayDescargo=false;
      this.guardaDesembolsoDescarga(datosDescargo);
    }

    guardaStatusCompra(DatosStatus:any){
      this._sgmService.apiStatusCompras(DatosStatus).subscribe(data2 => {

        }, error => {
        console.log(error);
        localStorage.removeItem('token');
        this.router.navigateByUrl('/auth/login')
      });
      alert("ok");
      this.refreshPage();

    }

    guardaDesembolsoDescarga(DatosDese:any){
      this._sgmService.apiDesembolsoDescargaCompras(DatosDese).subscribe(data2 => {
        }, error => {
        console.log(error);
        localStorage.removeItem('token');
        this.router.navigateByUrl('/auth/login')
      });
      alert("ok");
      this.refreshPage();
    }

    fechaRegistro(){
      // Create a new Date object
      var now = new Date();
      // Get the individual date and time components
      var year = now.getFullYear();
      var month = now.getMonth() + 1; // Months are zero-based
      var day = now.getDate();
      var hours = now.getHours();
      var minutes = now.getMinutes();
      var seconds = now.getSeconds();
      // Format the date and time
      var formattedDateTime = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      //console.log(formattedDateTime);
      return formattedDateTime
    }

    refreshPage() {
      {
        this.location.replaceState(this.location.path()); // Keep the current URL in history
        window.location.reload(); // Reload the page
      }
    }

    ngOnDestroy() {

    }


}
