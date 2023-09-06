import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/login'
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'https://api.datacom.com.bo/user/singin';

  constructor(
    private JwtHelper: JwtHelperService,
    private http: HttpClient) { }

  singin(user: User): Observable<any>{
    return this.http.post<any>(this.URL, user);

  }

  isAuth():boolean{
    const token = localStorage.getItem('token');
    if(token && this.JwtHelper.isTokenExpired(token) || !localStorage.getItem('token')){
      return false;
    }
    return true;
  }

}
