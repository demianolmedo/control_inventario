import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../paginas/service/auth.service';


import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor (
    private authService: AuthService,
    public router: Router
  ){}
  canActivate(router: ActivatedRouteSnapshot):boolean{

    const expectedRole =  router.data['expectedRole'];
    const token = decode(localStorage.getItem('token')  || '{}');

    let token1 = JSON.stringify(token);
    let token2 = JSON.parse(token1);
    let plataforma = token2.data.plataforma;
    console.log(plataforma);

    if(plataforma !== expectedRole){
      console.log('Usuario no autorizado para la vista');
      this.router.navigate(['/auth/login'])
      return false;
    }

    console.log(token);
    return true;
  }

}
