import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SgmService {
  url = 'http://172.25.39.36:3000/sgm/';

  // url = 'https://api.datacom.com.bo/sgm/';

  constructor(private http: HttpClient) { }

///////////////////////////////////            ITEM                     //////////////////////////////////////////////////////////////////
  apiObtenerItemsLista(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(this.url+'items/lista', { headers })
  }

  apiNuevoItem(item_datos: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post(this.url+'items/nuevo', item_datos, { headers })
  }

  apiEditarItem(item_datos: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post(this.url+'items/editar', item_datos, { headers })
  }

  apiEliminaItem(item_datos: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post(this.url+'items/elimina', item_datos, { headers })
  }

  apiObtenerMarcaLista(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(this.url+'marca/lista', { headers })
  }

  apiObtenerMedidaLista(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(this.url+'medida/lista', { headers })
  }

  apiObtenerClasificacion(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(this.url+'clasificacion/lista', { headers })
  }



  ///////////////////////////////////            PROVEEDOR                     //////////////////////////////////////////////////////////////////

  apiObtenerProveedorLista(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(this.url+'proveedor/lista', { headers })
  }

  apiObtenerProveedor(id: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(this.url+'proveedor/'+id, { headers })
  }

  editarProveedor(nuevoProveedor: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
   return this.http.post(this.url+'proveedor/editar', nuevoProveedor, { headers });
  }

  guardaNuevoProveedor(nuevoProveedor: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
   return this.http.post(this.url+'proveedor/nuevo', nuevoProveedor, { headers });
  }

  eliminaProveedor(id_bita: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
   return this.http.post(this.url+'proveedor/elimina', id_bita, { headers });
  }

  guardaContactoProveedor(nuevoProveedor: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
   return this.http.post(this.url+'proveedor/guarda/contacto', nuevoProveedor, { headers });
  }


  ///////////////////////////////////            COMPRAS                     //////////////////////////////////////////////////////////////////

  apiObtenerComprasLista(datos:any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post(this.url+'compras/lista', datos, { headers })
  }

  apiGuardarCompras(datos:any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post(this.url+'compras/guardar', datos, { headers })
  }

  apiStatusCompras(datos:any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post(this.url+'compras/status', datos, { headers })
  }

  apiDesembolsoDescargaCompras(datos:any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post(this.url+'compras/desembolso', datos, { headers })
  }

  // apiObtenerPlataforma(datosenv: any): Observable<any> {
  //   const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
  //   //console.log(headers);
  //   return this.http.post(this.urlPlataforma, datosenv, { headers })
  // }

  // obtenerMarcaciones(id: any): Observable<any> {
  //   const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
  //    return this.http.get(this.url + id, { headers })
  // }

  // buscarMarcaciones(marcaciones: any): Observable<any> {
  //   const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
  //   return this.http.post(this.url, marcaciones, { headers });
  // }

  // guardaMarcaciones(marcaciones: any): Observable<any> {
  //   const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
  //  return this.http.post(this.urlreg, marcaciones, { headers });
  // }

  // salidaMarcaciones(marcaciones: any): Observable<any> {
  //   const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
  //   return this.http.post(this.urlsal, marcaciones, { headers });
  // }

  // enviEmail(envioemail: any): Observable<any> {
  //   const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
  //   return this.http.post(this.urlemail, envioemail, { headers });
  // }


}

