import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProductsListComponent } from './components/bulletins-list/products-list.component';
import { ProductsAddComponent } from './components/bulletin-add/products-add.component';
import { ProductsReportsComponent } from './components/products-reports/products-reports.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [ 
    {path: '', redirectTo: 'login', pathMatch:'full'},
    {path: 'login', component:LoginComponent},
    {path: 'register', component:RegisterComponent},
    {path: 'products', component:ProductsListComponent},
    {path: 'add-product', component:ProductsAddComponent},
    {path: 'reports', component:ProductsReportsComponent},
];
