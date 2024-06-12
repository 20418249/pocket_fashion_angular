import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { HttpClient, HttpClientModule, provideHttpClient, } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { provideClientHydration } from '@angular/platform-browser';
import { ProductsAddComponent } from './components/bulletin-add/products-add.component';
import { LoginComponent } from './components/login/login.component';
import { ProductsListComponent } from './components/bulletins-list/products-list.component';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideAnimationsAsync(),
    provideClientHydration(),
    provideHttpClient(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    ProductsListComponent,
    ProductsAddComponent,
    LoginComponent,
    HttpClient,
    AppComponent,
    provideCharts(withDefaultRegisterables())
  ]
};
