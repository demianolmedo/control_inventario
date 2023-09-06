import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './paginas/components/notfound/notfound.component';
import { AuthService } from './paginas/service/auth.service'

//Modules
import { FormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

//Providers
import {JwtHelperService, JWT_OPTIONS} from '@auth0/angular-jwt';
//import { TokenInterceptorService } from './services/token-interceptor.service';


@NgModule({
    declarations: [
        AppComponent, NotfoundComponent
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        FormsModule,
        HttpClientModule
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        { provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
        JwtHelperService, AuthService

    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
