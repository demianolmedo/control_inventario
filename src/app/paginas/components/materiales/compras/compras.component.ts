import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';
import { SgmService } from 'src/app/paginas/service/sgm.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import decode from 'jwt-decode';



@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
})
export class ComprasComponent {

  loading: boolean = true;
  compras: any[] = [];
  titulo: string=''
  display: boolean = false;
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
  CompraFechaDesembolso: string='';
  CompraNComprobante: string='';
  CompraFechaDescargo: string='';
  CompraCalidad: string='';
  CompraMarca: string='';
  CompraPresentacionItem: string='';
  CompraCantidadTotal: string='';
  CompraFechaSolicita: string='';
  CompraFechaJefatura: string='';
  CompraFechaGerencia: string='';
  nuevoCompra: boolean = false;
  lista: boolean = true;
  compraForms: FormGroup;
  proveedor: any[] = [];
  items: any[] = [];
  itemsFiltro: any[] = [];
  medidaInventario: any;
  clasificacion: any;
  medidaCompra: any;
  presentacion: any[]=[];
  cantidadTotal: any;
  presentacionValue: any;
  valCheck: string[] = [];
  botonNuevo: boolean = true

  token: any="";
  token1: any="";
  token2: any="";
  DESCRIPTION: any="";
  id_login: any="";
  departamento: any="";
  region: any="";


  lpcheckboxMarcado: boolean  = false;
  sccheckboxMarcado: boolean  = false;
  cbcheckboxMarcado: boolean  = false;
  chcheckboxMarcado: boolean  = false;
  orcheckboxMarcado: boolean  = false;
  pocheckboxMarcado: boolean  = false;
  tacheckboxMarcado: boolean  = false;
  becheckboxMarcado: boolean  = false;
  pacheckboxMarcado: boolean  = false;

  lpValue: number = 0;
  scValue: number = 0;
  cbValue: number = 0;
  chValue: number = 0;
  orValue: number = 0;
  poValue: number = 0;
  taValue: number = 0;
  beValue: number = 0;
  paValue: number = 0;
  regionValue: number = 0;
  restaReginalValue: number = 0;

  lpObj: any={};
  scObj: any={};
  cbObj: any={};
  chObj: any={};
  orObj: any={};
  poObj: any={};
  taObj: any={};
  beObj: any={};
  paObj: any={};
  departamento_j: any[]=[]

  titulourl: any;


  constructor(
    private _sgmService: SgmService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute
    //private service: MessageService
    ) {

      this.token = decode(localStorage.getItem('token')  || '{}');
      this.token1 = JSON.stringify(this.token);
      this.token2 = JSON.parse(this.token1);
      this.DESCRIPTION = this.token2.data.DESCRIPTION;
      this.id_login = this.token2.data.USER_ID;
      this.departamento = this.token2.data.L2_DEPARTAMENTO;

      this.departamentoNombre(this.departamento)

      this.compraForms = this.fb.group({
        id_proveedor: ['', Validators.required],
        id_item: ['', Validators.required],
        cantidadCompra: ['', Validators.required],
        //medidaCompra: ['', Validators.required],
        precioUnitarioCompra: ['', Validators.required],
        precioTotalCompra: ['', Validators.required],
        presentacionItem: ['', Validators.required],
        //presentacionMedida: ['', Validators.required],
        //cantidadTotal: ['', Validators.required],
        //departamento_j: ['', Validators.required],
        observacion: [''],
        tipoCompra:['']
      })

    }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.titulourl = params['titulo'];
      console.log(this.titulourl); // Puedes hacer lo que necesites con el valor del parámetro
      this.titulo=this.titulourl;
      this.loading = true;
      this.ObtenerComprasLista({estado:this.titulo})
    });

    this.titulo=this.titulourl;
    this.compras=[];
    this.loading = false;


  }

  ObtenerComprasLista(datos: any){
    this._sgmService.apiObtenerComprasLista(datos).subscribe(data => {
      this.compras = data;
      this.loading = false;
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

    // console.log(datos.departamentos_j)
  }

  nuevaCompraBoton(){
    this.ObtenerProveedorLista();
    this.ObtenerItemsLista();
    this.nuevoCompra = true;
    this.lista = false;
  }

  regresar(){
    this.refreshPage()
  }

  ObtenerProveedorLista(){
    this._sgmService.apiObtenerProveedorLista().subscribe(data => {
      this.proveedor = data;
      //console.log(this.proveedor)
      }, error => {
      console.log(error);
      localStorage.removeItem('token');
      this.router.navigateByUrl('/auth/login')
    });
    this.validaFormulario();
  }

  ObtenerItemsLista(){
    this._sgmService.apiObtenerItemsLista().subscribe(data => {
      this.items = data;
      //console.log(this.proveedor)
      }, error => {
      console.log(error);
      localStorage.removeItem('token');
      this.router.navigateByUrl('/auth/login')
    });
    this.validaFormulario();
  }

    onSelectProveedor() {

      this.validaFormulario();
      this.medidaInventario='';
      this.cantidadTotal=''
      this.itemsFiltro=[]
      let j = 0
      const proveedorSeleccionado = this.proveedor.find(item => item.id_proveedor === this.compraForms.get('id_proveedor')?.value);
      //console.log(proveedorSeleccionado.id_proveedor)
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].id_proveedor===proveedorSeleccionado.id_proveedor){
          //console.log(this.items[i]);
          this.itemsFiltro[j] = this.items[i]
          j++
        }
      }
    }

    onSelectItem() {
      this.validaFormulario();
      this.medidaInventario='';
      this.clasificacion='';
      this.cantidadTotal=''
      const itemSeleccionado = this.items.find(item => item.id_item === this.compraForms.get('id_item')?.value);
      this.medidaInventario=itemSeleccionado.medidaInventario;
      this.clasificacion=itemSeleccionado.clasificacion;
      this.medidaCompra=itemSeleccionado.medidaCompra;

      for (let i = 0; i < itemSeleccionado.presentacion.length; i++) {
          this.presentacion[i] = parseInt(itemSeleccionado.presentacion[i])
      }
     //console.log(this.presentacion)
    }

    calcularPrecioUnitario(){
      this.compraForms.patchValue({
        cantidadCompra: Math.abs(parseInt(this.compraForms.get('cantidadCompra')?.value)),
        precioUnitarioCompra: (this.compraForms.get('precioTotalCompra')?.value)/(this.compraForms.get('cantidadCompra')?.value),
      })
      this.validaFormulario();
    }

    calcularPrecioTotal(){
      this.compraForms.patchValue({
        cantidadCompra: Math.abs(parseInt(this.compraForms.get('cantidadCompra')?.value)),
        precioTotalCompra: (this.compraForms.get('precioUnitarioCompra')?.value)*(this.compraForms.get('cantidadCompra')?.value),
      })
      this.validaFormulario();
    }

    onSelectPresentacion(){
      this.cantidadTotal=''
      this.cantidadTotal=(parseInt(this.compraForms.get('cantidadCompra')?.value))*(this.presentacionValue)
      this.compraForms.patchValue({
        cantidadTotal: (parseInt(this.compraForms.get('cantidadCompra')?.value))*(this.presentacionValue),
      })
      this.validaFormulario();
    }


    cantidadRegion(event: any, region: any){

      if(this.lpcheckboxMarcado && region=='LP'){this.lpValue = Math.abs(parseInt(event.target.value))} if(!this.lpcheckboxMarcado){this.lpValue=0}
      if(this.sccheckboxMarcado && region=='SC'){this.scValue = Math.abs(parseInt(event.target.value))} if(!this.sccheckboxMarcado){this.scValue=0}
      if(this.cbcheckboxMarcado && region=='CB'){this.cbValue = Math.abs(parseInt(event.target.value))} if(!this.cbcheckboxMarcado){this.cbValue=0}
      if(this.chcheckboxMarcado && region=='CH'){this.chValue = Math.abs(parseInt(event.target.value))} if(!this.chcheckboxMarcado){this.chValue=0}
      if(this.orcheckboxMarcado && region=='OR'){this.orValue = Math.abs(parseInt(event.target.value))} if(!this.orcheckboxMarcado){this.orValue=0}
      if(this.pocheckboxMarcado && region=='PO'){this.poValue = Math.abs(parseInt(event.target.value))} if(!this.pocheckboxMarcado){this.poValue=0}
      if(this.tacheckboxMarcado && region=='TA'){this.taValue = Math.abs(parseInt(event.target.value))} if(!this.tacheckboxMarcado){this.taValue=0}
      if(this.becheckboxMarcado && region=='BE'){this.beValue = Math.abs(parseInt(event.target.value))} if(!this.becheckboxMarcado){this.beValue=0}
      if(this.pacheckboxMarcado && region=='PA'){this.paValue = Math.abs(parseInt(event.target.value))} if(!this.pacheckboxMarcado){this.paValue=0}

      this.regionValue = this.lpValue + this.scValue + this.cbValue + this.chValue + this.orValue + this.poValue + this.taValue + this.beValue + this.paValue;

      this.lpObj = {ciudad:'LA PAZ', valor:this.lpValue, fechaProgCalidad:'', obsCalidad:'', loginCalidad:'', nombreCalidad:'', fechaCalidad:'', obsAlmacen:'', loginAlmacen:'', nombreAlmacen:'', fechaAlmacen:'', control:0};
      this.scObj = {ciudad:'SANTA CRUZ', valor:this.scValue, fechaProgCalidad:'', obsCalidad:'', loginCalidad:'', nombreCalidad:'', fechaCalidad:'', obsAlmacen:'', loginAlmacen:'', nombreAlmacen:'', fechaAlmacen:'', control:0};
      this.cbObj = {ciudad:'COCHABAMBA', valor:this.cbValue, fechaProgCalidad:'', obsCalidad:'', loginCalidad:'', nombreCalidad:'', fechaCalidad:'', obsAlmacen:'', loginAlmacen:'', nombreAlmacen:'', fechaAlmacen:'', control:0};
      this.chObj = {ciudad:'CHUQUISACA', valor:this.chValue, fechaProgCalidad:'', obsCalidad:'', loginCalidad:'', nombreCalidad:'', fechaCalidad:'', obsAlmacen:'', loginAlmacen:'', nombreAlmacen:'', fechaAlmacen:'', control:0};
      this.orObj = {ciudad:'ORURO', valor:this.orValue, fechaProgCalidad:'', obsCalidad:'', loginCalidad:'', nombreCalidad:'', fechaCalidad:'', obsAlmacen:'', loginAlmacen:'', nombreAlmacen:'', fechaAlmacen:'', control:0};
      this.poObj = {ciudad:'POTOSI', valor:this.poValue, fechaProgCalidad:'', obsCalidad:'', loginCalidad:'', nombreCalidad:'', fechaCalidad:'', obsAlmacen:'', loginAlmacen:'', nombreAlmacen:'', fechaAlmacen:'', control:0};
      this.taObj = {ciudad:'TARIJA', valor:this.taValue, fechaProgCalidad:'', obsCalidad:'', loginCalidad:'', nombreCalidad:'', fechaCalidad:'', obsAlmacen:'', loginAlmacen:'', nombreAlmacen:'', fechaAlmacen:'', control:0};
      this.beObj = {ciudad:'BENI', valor:this.beValue, fechaProgCalidad:'', obsCalidad:'', loginCalidad:'', nombreCalidad:'', fechaCalidad:'', obsAlmacen:'', loginAlmacen:'', nombreAlmacen:'', fechaAlmacen:'', control:0};
      this.paObj = {ciudad:'PANDO', valor:this.paValue, fechaProgCalidad:'', obsCalidad:'', loginCalidad:'', nombreCalidad:'', fechaCalidad:'', obsAlmacen:'', loginAlmacen:'', nombreAlmacen:'', fechaAlmacen:'', control:0};

      this.validaFormulario();

    }

    validaFormulario(){
      if(this.regionValue==this.compraForms.get('cantidadCompra')?.value && !this.compraForms.invalid){this.botonNuevo=false}else{this.botonNuevo=true}
      this.restaReginalValue=this.compraForms.get('cantidadCompra')?.value - this.regionValue;
    }

    refreshPage(): void {
      const currentUrl = this.router.url;
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigateByUrl(currentUrl);
      });
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

    guardar(){

      this.departamento_j.push(this.lpObj); this.departamento_j.push(this.scObj); this.departamento_j.push(this.cbObj); this.departamento_j.push(this.chObj); this.departamento_j.push(this.orObj); this.departamento_j.push(this.poObj); this.departamento_j.push(this.taObj); this.departamento_j.push(this.beObj); this.departamento_j.push(this.paObj);

      const compra: any = {
        id_proveedor: this.compraForms.get('id_proveedor')?.value,
        id_item: this.compraForms.get('id_item')?.value,
        cantidadCompra: this.compraForms.get('cantidadCompra')?.value,
        medidaCompra: this.medidaInventario,
        precioUnitarioCompra: this.compraForms.get('precioUnitarioCompra')?.value,
        precioTotalCompra: this.compraForms.get('precioTotalCompra')?.value,
        presentacionItem: this.presentacionValue,
        presentacionMedida: this.medidaCompra,
        cantidadTotal: this.cantidadTotal,
        observacion: this.compraForms.get('observacion')?.value,
        login_solicita: this.id_login,
        nombre_solicita: this.DESCRIPTION,
        departamento_solicita: this.region,
        fecha_solicita: this.fechaRegistro(),
        departamentos_j: JSON.stringify(this.departamento_j),
        //tipoCompra: this.compraForms.get('tipoCompra')?.value
        tipoCompra:1
      };


      this._sgmService.apiGuardarCompras(compra).subscribe(data => {
        const codigo_compra = ("0000000"+data.id_compra)
        alert("Compra Guardada: CPR-"+codigo_compra.substring(codigo_compra.length -7))
        this.refreshPage()
        }, error => {
        console.log(error);
        localStorage.removeItem('token');
        this.router.navigateByUrl('/auth/login')
      });

      this.refreshPage()



    }

}
