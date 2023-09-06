import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  constructor(private http: HttpClient) { }

  getDepartamentos() {
    return this.http.get<any>('assets/data/departamentos.json')
        .toPromise()
        .then(res => res.data as any[])
        .then(data => data);
}
}
