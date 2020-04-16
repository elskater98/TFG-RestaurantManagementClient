import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatCardModule, MatDialogModule,
  MatFormFieldModule, MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule, MatSelectModule,
  MatSidenavModule, MatSnackBar, MatSnackBarModule, MatTableModule, MatTabsModule,
  MatToolbarModule
} from '@angular/material';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthenticationService} from './services/authentication.service';
import {HttpClientModule} from '@angular/common/http';
import {UserService} from './services/user.service';
import { EmployeesComponent } from './employees/employees.component';
import { EditEmployeesDialogComponent } from './employees/edit-employees-dialog/edit-employees-dialog.component';
import { DeleteEmployeDialogComponent } from './employees/delete-employe-dialog/delete-employe-dialog.component';
import { ReservaComponent } from './reserva/reserva.component';
import { ReservaCreateComponent } from './reserva/reserva-create/reserva-create.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    EmployeesComponent,
    EditEmployeesDialogComponent,
    DeleteEmployeDialogComponent,
    ReservaComponent,
    ReservaCreateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatSelectModule,
    FormsModule,
    MatTableModule,
    MatDialogModule,
    MatGridListModule,
    MatCardModule,
    MatTabsModule
  ],
  providers: [
    AuthenticationService
  ],
  bootstrap: [AppComponent],
  entryComponents: [EditEmployeesDialogComponent,DeleteEmployeDialogComponent,RegisterComponent,ReservaCreateComponent]
})
export class AppModule { }
