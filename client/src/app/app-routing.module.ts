import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {EmployeesComponent} from './employees/employees.component';
import {ReservaComponent} from './reserva/reserva.component';
import {EncarrecComponent} from './encarrec/encarrec.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent},
  { path: 'employees', component: EmployeesComponent},
  { path: 'reserve', component: ReservaComponent},
  {path:'meals',component: EncarrecComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
