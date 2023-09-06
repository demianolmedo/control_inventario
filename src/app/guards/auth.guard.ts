import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../paginas/service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ){ }
  canActivate():boolean {

    if(!this.authService.isAuth()){
      console.log('Token no es valido o ya expiró');
      this.router.navigate(['/auth/login'])
      return false;
    }
    return true;
  }

}
