import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/paginas/service/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {

    user = {
      userName: '',
      pass: ''
    }

    valCheck: string[] = ['remember'];

    password!: string;

    constructor(
      private authService: AuthService,
      private router: Router) { }

      ngOnInit() {

      }

      logIn() {
        console.log(this.user);
        this.authService.singin(this.user).subscribe( res => {
          console.log(res);
          localStorage.setItem('token', res.token);
          this.router.navigate(['']);
        },error =>{
          console.log(error);
        })
      }
}
