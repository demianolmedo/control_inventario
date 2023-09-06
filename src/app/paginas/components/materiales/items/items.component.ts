import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';
import { SgmService } from 'src/app/paginas/service/sgm.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import decode from 'jwt-decode';

interface expandedRows {
  [key: string]: boolean;
}

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  providers: [MessageService, ConfirmationService]
})
export class ItemsComponent {

  items: any[] = [];
  proveedor: any[] = [];
  loading: boolean = true;
  selectedProveedorAdvanced: any[] = [];
  filteredProveedor: any[] = [];
  marca: any[] = [];
  clasificacion: any[] = [];
  selectedMarcaAdvanced: any[] = [];
  filteredMarca: any[] = [];
  medida: any[] = [];
  selectedMedidaAdvanced: any[] = [];
  filteredMedida: any[] = [];
  convertir: any[] = [];
  selectedConvertirAdvanced: any[] = [];
  filteredConvertir: any[] = [];
  @ViewChild('filter') filter!: ElementRef;
  itemForms: FormGroup;
  nuevoItem: boolean = false;
  lista: boolean = true
  TituloItem: any
  token: any="";
  token1: any="";
  token2: any="";
  DESCRIPTION: any="";
  editarItem: boolean = false;
  presentacionS: string=''


 constructor(
  private _sgmService: SgmService,
  private router: Router,
  private fb: FormBuilder,
  private service: MessageService,
  private confirmationService: ConfirmationService

  ) {

    this.token = decode(localStorage.getItem('token')  || '{}');
      this.token1 = JSON.stringify(this.token);
      this.token2 = JSON.parse(this.token1);
      this.DESCRIPTION = this.token2.data.DESCRIPTION;

    this.itemForms = this.fb.group({
      id_proveedor: ['', Validators.required],
      item: ['', Validators.required],
      marca: ['', Validators.required],
      clasificacion: ['', Validators.required],
      medidaCompra: ['', Validators.required],
      medidaInventario: ['', [Validators.required]],
      presentacion: ['', Validators.required],
      observacion: [''],
      bitacora: [''],
      id_item: ['']
    })

    this.ObtenerItemLista()

    this.ObtenerProveedorLista();
    this.ObtenerMarcaLista();
    this.ObtenerMedidaLista();
    this.ObtenerClasificacionLista();
    this.ObtenerItemLista();

  }

  ngOnInit() {




  }

  refreshPage(): void {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigateByUrl(currentUrl);
    });
  }

  ObtenerItemLista(){
    this._sgmService.apiObtenerItemsLista().subscribe(data => {
      this.items = data;
      this.loading = false;
      }, error => {
      console.log(error);
      localStorage.removeItem('token');
      this.router.navigateByUrl('/auth/login')
    });
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
  }

  ObtenerMarcaLista(){
    this._sgmService.apiObtenerMarcaLista().subscribe(data => {
      this.marca = data;
      //console.log(this.proveedor)
      }, error => {
      console.log(error);
      localStorage.removeItem('token');
      this.router.navigateByUrl('/auth/login')
    });
  }

  ObtenerMedidaLista(){
    this._sgmService.apiObtenerMedidaLista().subscribe(data => {
      for (let i = 0; i < data.length; i++){
        if(data[i]["tipo"]==2){this.medida.push(data[i]);}
        if(data[i]["tipo"]==1){this.convertir.push(data[i]);}
      }
      }, error => {
      console.log(error);
      localStorage.removeItem('token');
      this.router.navigateByUrl('/auth/login')
    });
  }

  ObtenerClasificacionLista(){
    this._sgmService.apiObtenerClasificacion().subscribe(data => {
      this.clasificacion = data;
      //console.log(this.proveedor)
      }, error => {
      console.log(error);
      localStorage.removeItem('token');
      this.router.navigateByUrl('/auth/login')
    });
  }


  onGlobalFilter(table: Table, event: Event) {
      table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clear(table: Table) {
      table.clear();
      this.filter.nativeElement.value = '';
  }

  accionBotonForm(accion:any, titulo:any,  id:any){

    if(accion=="regresar"){
      this.itemForms.reset();
      this.lista=true;
      this.nuevoItem=false
    }

    if (accion=="guardar"){

      const jsonData = [{
        usuario: this.DESCRIPTION,
        accion: 'Nuevo',
        fecha: this.fechaRegistro()
      }];

      const item_data: any = {
        id_proveedor: this.itemForms.get('id_proveedor')?.value,
        item: this.itemForms.get('item')?.value,
        marca: this.itemForms.get('marca')?.value,
        clasificacion: this.itemForms.get('clasificacion')?.value,
        medidaCompra: this.itemForms.get('medidaCompra')?.value,
        medidaInventario: this.itemForms.get('medidaInventario')?.value,
        presentacion: JSON.stringify(this.itemForms.get('presentacion')?.value.split(",")),
        observacion: this.itemForms.get('observacion')?.value,
        usuario: this.DESCRIPTION,
        fecha: this.fechaRegistro(),
        bitacora: JSON.stringify(jsonData)
      };

      console.log(item_data)

      this._sgmService.apiNuevoItem(item_data).subscribe(data => {
        }, error => {
        console.log(error);
        localStorage.removeItem('token');
        this.router.navigateByUrl('/auth/login')
      });

      alert("Item Creado")

    }

    if (accion=="editar"){

      const jsonData = [{
        usuario: this.DESCRIPTION,
        accion: 'Editado',
        fecha: this.fechaRegistro()
      }];

      const bita = this.itemForms.get('bitacora')?.value
      const bitaE = bita.concat(jsonData)

      const item_data: any = {
        id_proveedor: this.itemForms.get('id_proveedor')?.value,
        item: this.itemForms.get('item')?.value,
        marca: this.itemForms.get('marca')?.value,
        medidaCompra: this.itemForms.get('medidaCompra')?.value,
        medidaInventario: this.itemForms.get('medidaInventario')?.value,
        presentacion: JSON.stringify(this.itemForms.get('presentacion')?.value.split(",")),
        observacion: this.itemForms.get('observacion')?.value,
        id_item: this.itemForms.get('id_item')?.value,
        usuario: this.DESCRIPTION,
        fecha: this.fechaRegistro(),
        bitacora: JSON.stringify(bitaE)

      };

      this._sgmService.apiEditarItem(item_data).subscribe(data => {
        }, error => {
        console.log(error);
        localStorage.removeItem('token');
        this.router.navigateByUrl('/auth/login')
      });

      alert("Item Actualizado")

    }

    this.refreshPage()
  }

  ItemNuevo(titulo: any, id_proveedor: any) {
    this.nuevoItem= true;
    this.lista = false;
    this.TituloItem= titulo;

  }

  showInfoViaToast(msg: any, titulo: any) {
    this.service.add({ key: 'tst', severity: 'info', summary: titulo, detail: msg });
  }

  EliminaItem(event: Event, id_items: any, bitacoras: any){

    this.confirmationService.confirm({
      key: 'confirm2',
      target: event.target || new EventTarget,
      message: 'Esta seguro que desea eliminar el Item?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        const jsonData = [{
          usuario: this.DESCRIPTION,
          accion: 'Eliminar',
          fecha: this.fechaRegistro()
        }];

        const item_data: any = {
          id_item: id_items,
          usuario: this.DESCRIPTION,
          fecha: this.fechaRegistro(),
          bitacora: bitacoras.concat(jsonData)
        };

        this._sgmService.apiEliminaItem(item_data).subscribe(data => {
          }, error => {
          console.log(error);
          localStorage.removeItem('token');
          this.router.navigateByUrl('/auth/login')
        });

        alert("Item Eliminado");
        this.refreshPage();

      },
      reject: () => {
          this.service.add({ key:"tst", severity: 'error', summary: 'Cancelado', detail: 'No se elimino' });
      }
  });


  }

  EditarItem(id_datos: any){

    this.nuevoItem = true;
    this.lista = false
    this.TituloItem = 'Editar Item';
    this.editarItem = true;

    this.presentacionS='';
    for (let i = 0; i < id_datos.presentacion.length; i++) {
      this.presentacionS += id_datos.presentacion[i]+','; // Imprime cada número en la consola
    }


    this.itemForms.setValue({
      id_proveedor: id_datos.id_proveedor,
      item: id_datos.item,
      marca: id_datos.id_marca,
      medidaCompra: id_datos.id_medidacompra,
      medidaInventario: id_datos.id_medidainventario,
      presentacion: this.presentacionS.slice(0,-1),
      observacion: id_datos.observacion,
      bitacora: id_datos.bitacora,
      id_item: id_datos.id_item
    })

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
