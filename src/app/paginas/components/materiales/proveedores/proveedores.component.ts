import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { SgmService } from 'src/app/paginas/service/sgm.service';
import { DepartamentoService } from 'src/app/paginas/service/departamento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import decode from 'jwt-decode';


interface expandedRows {
  [key: string]: boolean;
}

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  providers: [MessageService, ConfirmationService]
})
export class ProveedoresComponent {

  proveedor: any[] = [];
  proveedorId: any[] = [];
  isExpanded: boolean = false;
  expandedRows: expandedRows = {};
  @ViewChild('filter') filter!: ElementRef;
  loading: boolean = true;
  nuevoContacto: boolean = false;
  nuevoProveedor: boolean = false;
  lista: boolean = true;
  TituloProveedor = "Nuevo Proveedor";
  TituloContacto = "Editar Contacto";
  departamentos: any[] = [];
  selectedDepartamentoAdvanced: any[] = [];
  filteredDepartamento: any[] = [];
  proveedorForms: FormGroup;
  contactoForms: FormGroup;
  token: any="";
  token1: any="";
  token2: any="";
  DESCRIPTION: any="";
  id_proveedor: any = {
    id_proveedor:'',
    razonSocial:'',
    contacto_j:[{nombre:'',celular:'',fijo:'',departamento:'',email:'',direccion:'',observacion:''}],
    bitacora:[{nombre:'',accion:'',fecha:''}]
  };
  contactoString: any[]=[];
  bitacoraE: boolean=false;
  contactoE: boolean=false;
  bitacoraEditar: any;

  selectedRow: any;

  constructor(
    private _sgmService: SgmService,
    private _departamentoService: DepartamentoService,
    private router: Router,
    private service: MessageService,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService
    ) {

      this.token = decode(localStorage.getItem('token')  || '{}');
      this.token1 = JSON.stringify(this.token);
      this.token2 = JSON.parse(this.token1);
      this.DESCRIPTION = this.token2.data.DESCRIPTION;

      this.proveedorForms = this.fb.group({
        nombre: ['', Validators.required],
        telefono: ['', Validators.required],
        nit: ['', Validators.required],
        departamento: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        direccion: ['', Validators.required],
        observacion: ['']
      })

      this.contactoForms = this.fb.group({
        nombre: ['', Validators.required],
        celular: ['', Validators.required],
        fijo: ['', Validators.required],
        departamento: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        direccion: ['', Validators.required],
        observacion: ['']
      })

      this.ListaProveedores();

      this._departamentoService.getDepartamentos().then(data => {this.departamentos = data;});

    }

  ngOnInit() {

  }

  refreshPage(): void {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigateByUrl(currentUrl);
    });
  }

  ListaProveedores(){
    this._sgmService.apiObtenerProveedorLista().subscribe(data => {
      this.proveedor = data;
      this.obtneridpro(data)
      this.loading = false;
      }, error => {
      console.log(error);
      localStorage.removeItem('token');
      this.router.navigateByUrl('/auth/login')
    });
  }

  creaNuevoProveedor(NuevoPro: any){
    this._sgmService.guardaNuevoProveedor(NuevoPro).subscribe(data1 => {
      this.obtneridpro(data1)
      }, error => {
      console.log(error);
      localStorage.removeItem('token');
      this.router.navigateByUrl('/auth/login')
    });
    alert("Proveedor Nuevo Guardado ");
  }

  editarProveedor(editaPro: any){
    this._sgmService.editarProveedor(editaPro).subscribe(data2 => {
      this.obtneridpro(data2)
      console.log(data2)
      }, error => {
      console.log(error);
      localStorage.removeItem('token');
      this.router.navigateByUrl('/auth/login')
    });
    alert("Proveedor Actualizado ");
  }

  EliminaProveedor(event: Event, id_provee: any, bitacora: any[]){


  this.confirmationService.confirm({
    key: 'confirm2',
    target: event.target || new EventTarget,
    message: 'Esta seguro que desea eliminar el Proveedor?',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {

      const id_bita: any={
        id_proveedor: id_provee,
        bitacora: bitacora,
        usuario: this.DESCRIPTION,
        fecha: this.fechaRegistro()
      }
      this._sgmService.eliminaProveedor(id_bita).subscribe(data1 => {
        }, error => {
        console.log(error);
        localStorage.removeItem('token');
        this.router.navigateByUrl('/auth/login')
      });
      alert("Proveedor Eliminado ");
      this.refreshPage()

    },
    reject: () => {
        this.service.add({ key:"tst", severity: 'error', summary: 'Cancelado', detail: 'No se elimino Proveedor' });
    }
});





  }

  obtneridpro(data: any){
    this.id_proveedor=data;
  }

  guardaContactoProveedor(NuevoPro: any, titulo: any){
    this._sgmService.guardaContactoProveedor(NuevoPro).subscribe(data2 => {
      this.obtneridpro(data2)
      }, error => {
      console.log(error);
      localStorage.removeItem('token');
      this.router.navigateByUrl('/auth/login')
    });
    alert("Contacto "+titulo);
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clear(table: Table) {
      table.clear();
      this.filter.nativeElement.value = '';
  }

  showInfoViaToast(msg: any, titulo: any) {
    this.service.add({ key: 'tst', severity: 'info', summary: titulo, detail: msg });
  }

  showErrorViaToast(msg: any) {
    this.service.add({ key: 'tst', severity: 'error', summary: 'Eliminado', detail: msg });
  }

  ContactoNuevo(titulo: any, id_proveedor: any) {
    this.nuevoContacto = true;
    this.lista = false;
    this.TituloContacto = titulo
  }

  ProveedorNuevo(titulo: any, id_proveedor: any) {
    this.nuevoProveedor = true;
    this.lista = false
    this.TituloProveedor = titulo

    if(id_proveedor>0){
      this._sgmService.apiObtenerProveedor(id_proveedor).subscribe(data => {
        this.proveedorId = data;
        console.log(this.proveedorId)
        this.loading = false;
        }, error => {
        console.log(error);
        localStorage.removeItem('token');
        this.router.navigateByUrl('/auth/login')
      });
    }

  }

  filterDepartamentos(event: any) {
    const filtered: any[] = [];
    const query = event.query;
    for (let i = 0; i < this.departamentos.length; i++) {
        const depa = this.departamentos[i];
          if (depa.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(depa);
        }
    }
    this.filteredDepartamento = filtered;
  }

  accionBotonForm(accion: any, titulo: any, msg: any, idProveedor: any, idContacto: any, bitacoraF: any){



    const NuevoPro: any = {
      nombre: this.proveedorForms.get('nombre')?.value.toUpperCase(),
      telefono: this.proveedorForms.get('telefono')?.value,
      nit: this.proveedorForms.get('nit')?.value,
      departamento: this.proveedorForms.get('departamento')?.value,
      email: this.proveedorForms.get('email')?.value,
      direccion: this.proveedorForms.get('direccion')?.value,
      observacion: this.proveedorForms.get('observacion')?.value,
      usuario: this.DESCRIPTION,
      fecha: this.fechaRegistro()
    };

    const EditPro: any = {
      nombre: this.proveedorForms.get('nombre')?.value.toUpperCase(),
      telefono: this.proveedorForms.get('telefono')?.value,
      nit: this.proveedorForms.get('nit')?.value,
      departamento: this.proveedorForms.get('departamento')?.value,
      email: this.proveedorForms.get('email')?.value,
      direccion: this.proveedorForms.get('direccion')?.value,
      observacion: this.proveedorForms.get('observacion')?.value,
      usuario: this.DESCRIPTION,
      fecha: this.fechaRegistro(),
      id_proveedor: idProveedor,
      bitacora: bitacoraF
    };


    const ContactoPro: any = [{
      nombre: this.contactoForms.get('nombre')?.value.toUpperCase(),
      celular: this.contactoForms.get('celular')?.value,
      fijo: this.contactoForms.get('fijo')?.value,
      departamento: this.contactoForms.get('departamento')?.value,
      email: this.contactoForms.get('email')?.value,
      direccion: this.contactoForms.get('direccion')?.value,
      observacion: this.contactoForms.get('observacion')?.value,
      estado:"1"
    }];

    const biatacoraPro: any = [{
      usuario: this.DESCRIPTION,
      accion: 'Contacto Nuevo',
      fecha: this.fechaRegistro()
    }];



    if (!this.id_proveedor['contacto_j']){
      //console.log(ContactoPro)
      this.contactoString=ContactoPro
    }else{
      //console.log(this.id_proveedor['contacto_j']," ++ ",ContactoPro)
      const tempcontacto_j=this.id_proveedor['contacto_j']
      this.contactoString=tempcontacto_j.concat(ContactoPro)
    }

//console.log(this.id_proveedor['contacto_j']," ---- ",ContactoPro)

    if(accion=="regresar"){
      this.ListaProveedores();
      this.proveedorForms.reset();
      this.lista=true;
      this.nuevoProveedor=false;
      this.nuevoContacto=false
    }

    if(accion=="guardar"){

        if(titulo=='Proveedor'){
            this.creaNuevoProveedor(NuevoPro);
        }
        if(titulo=='ProveedorEditar'){
          //console.log(EditPro);
          this.bitacoraEditar=this.id_proveedor['bitacora']
          this.editarProveedor(EditPro);
        }


        if(titulo=='Contacto'){
          const ContactoProString: any = {
            contacto_j: this.contactoString,
            bitacora: this.id_proveedor['bitacora'].concat(biatacoraPro),
            id_proveedor: this.id_proveedor['id_proveedor'],
            razonSocial:this.id_proveedor['razonSocial']
          }
          //console.log(ContactoProString.contacto_j)

          this.guardaContactoProveedor(ContactoProString, 'Guardado');
        }

        this.refreshPage()

    }
    if(accion=="contacto"){

        if(titulo=='Proveedor'){
          this.creaNuevoProveedor(NuevoPro);
        }

        if(titulo=='ProveedorEditarContacto'){
          this.editarProveedor(EditPro);
        }

        if(titulo=='Contacto'){
          this.ListaProveedores();
          const ContactoProString: any = {
            contacto_j: this.contactoString,
            bitacora: this.id_proveedor['bitacora'].concat(biatacoraPro),
            id_proveedor: this.id_proveedor['id_proveedor'],
            razonSocial: this.id_proveedor['razonSocial']
          }
          //console.log(ContactoProString.contacto_j)
          this.guardaContactoProveedor(ContactoProString, 'Guardado');
          this.contactoForms.setValue({
            nombre: null,
            celular: null,
            fijo: null,
            departamento: null,
            email: null,
            direccion: null,
            observacion: null
          })

        }

        // this.router.navigate(['/materiales/proveedores'])
        this.lista=false;
        this.nuevoProveedor=false;
        this.nuevoContacto=true
    }
  }

  pestanaeditarproveedor(datosProveedor:any){

    this.nuevoProveedor = true;
    this.lista = false
    this.TituloProveedor = 'Actualizar Proveedor'
    this.bitacoraE=true
    this.bitacoraEditar=datosProveedor.bitacora
    this.id_proveedor=datosProveedor.id_proveedor

    this.proveedorForms.setValue({
      nombre: datosProveedor.razonSocial,
      telefono: datosProveedor.telefono,
      nit: datosProveedor.nit,
      departamento: datosProveedor.departamento,
      email: datosProveedor.email,
      direccion: datosProveedor.direccion,
      observacion: datosProveedor.observacion
    })

  }

  pestanaAgregarContacto(datosProveedor:any){
    this.lista=false;
    this.nuevoProveedor=false;
    this.nuevoContacto=true

    this.bitacoraEditar=datosProveedor.bitacora
    this.id_proveedor=datosProveedor
  }

  eliminarContacto(event: Event, array:any[], find:any, id_pr: any){

    this.confirmationService.confirm({
      key: 'confirm2',
      target: event.target || new EventTarget,
      message: 'Esta seguro que desea eliminar el Contacto?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        const index = array.indexOf(find);
        const targetObject = { id_proveedor: id_pr };
        const index_p = this.id_proveedor.findIndex((obj: { id_proveedor: any; }) => obj.id_proveedor === targetObject.id_proveedor);
        this.id_proveedor[index_p]['contacto_j'][index]['estado']=0
        //console.log(this.id_proveedor[index_p]['contacto_j']);

        const biatacoraPro: any = [{
          usuario: this.DESCRIPTION,
          accion: 'Contacto Eliminado',
          fecha: this.fechaRegistro()
        }];
        const ContactoProString: any = {
          contacto_j: this.id_proveedor[index_p]['contacto_j'],
          bitacora: this.id_proveedor[index_p]['bitacora'].concat(biatacoraPro),
          id_proveedor: id_pr,
        }
        //console.log(ContactoProString.contacto_j)
        //console.log(ContactoProString)
        this.guardaContactoProveedor(ContactoProString, 'Eliminado');

      },
      reject: () => {
          this.service.add({ key: 'tst', severity: 'error', summary: 'Cancelado', detail: 'No se elimino Contacto' });
      }
    });



  }

  ContactoEditar(array:any[], find:any, id_pr: any){

    this.lista=false;
    this.nuevoProveedor=false;
    this.nuevoContacto=true

    const index = array.indexOf(find);
    const targetObject = { id_proveedor: id_pr };
    const index_p = this.id_proveedor.findIndex((obj: { id_proveedor: any; }) => obj.id_proveedor === targetObject.id_proveedor);

    this.contactoForms.setValue({
      nombre: this.id_proveedor[index_p]['contacto_j'][index]['nombre'],
      celular: this.id_proveedor[index_p]['contacto_j'][index]['celular'],
      fijo: this.id_proveedor[index_p]['contacto_j'][index]['fijo'],
      departamento: this.id_proveedor[index_p]['contacto_j'][index]['departamento'],
      email: this.id_proveedor[index_p]['contacto_j'][index]['email'],
      direccion: this.id_proveedor[index_p]['contacto_j'][index]['direccion'],
      observacion: this.id_proveedor[index_p]['contacto_j'][index]['observacion']
    })


    this.id_proveedor['contacto_j']=this.id_proveedor[index_p]['contacto_j'].filter((item: { nombre: any; }) => item.nombre !== this.id_proveedor[index_p]['contacto_j'][index]['nombre']);
    this.id_proveedor['bitacora']=this.id_proveedor[index_p]['bitacora'];
    this.id_proveedor['razonSocial']=this.id_proveedor[index_p]['razonSocial'];
    this.id_proveedor['id_proveedor']=this.id_proveedor[index_p]['id_proveedor']

    this.contactoE=true;

    //console.log(this.id_proveedor[index_p]['contacto_j'][index]['nombre'])

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


}
