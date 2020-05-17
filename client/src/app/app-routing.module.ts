import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {EmployeesComponent} from './employees/employees.component';
import {ReservaComponent} from './reserva/reserva.component';
import {EncarrecComponent} from './encarrec/encarrec.component';
import {FoodComponent} from './food/food.component';
import {ProductComponent} from './product/product.component';
import {AuthenticationGuard} from './authentication.guard';
import {AppComponent} from './app.component';
import {HomeGuard} from './home/home.guard';


const routes: Routes = [
  { path: '', component: HomeComponent,canActivate:[HomeGuard]},
  { path: 'login', component: LoginComponent},
  { path: 'employees', component: EmployeesComponent,canActivate:[AuthenticationGuard]},
  { path: 'reserve', component: ReservaComponent,canActivate:[AuthenticationGuard]},
  {path:'order',component: EncarrecComponent,canActivate:[AuthenticationGuard]},
  {path:'food',component: FoodComponent,canActivate:[AuthenticationGuard]},
  {path:'products',component: ProductComponent,canActivate:[AuthenticationGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
