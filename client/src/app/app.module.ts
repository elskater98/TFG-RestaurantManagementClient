import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MAT_DATE_LOCALE,
  MatButtonModule, MatCardModule, MatCheckboxModule, MatDatepickerModule, MatDialogModule,
  MatFormFieldModule, MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule, MatNativeDateModule, MatSelectModule,
  MatSidenavModule, MatSlideToggleModule, MatSnackBar, MatSnackBarModule, MatTableModule, MatTabsModule,
  MatToolbarModule
} from '@angular/material';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthenticationService} from './services/authentication.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {UserService} from './services/user.service';
import { EmployeesComponent } from './employees/employees.component';
import { EditEmployeesDialogComponent } from './employees/edit-employees-dialog/edit-employees-dialog.component';
import { DeleteEmployeDialogComponent } from './employees/delete-employe-dialog/delete-employe-dialog.component';
import { ReservaComponent } from './reserva/reserva.component';
import { ReservaCreateComponent } from './reserva/reserva-create/reserva-create.component';
import {DatePipe} from '@angular/common';
import { ReservaEditComponent } from './reserva/reserva-edit/reserva-edit.component';
import { ReservaDetailComponent } from './reserva/reserva-detail/reserva-detail.component';
import { ReservaDeleteComponent } from './reserva/reserva-delete/reserva-delete.component';
import { EncarrecComponent } from './encarrec/encarrec.component';
import {AuthInterceptor} from './authentication/auth-interceptor';
import { EncarrecCreateComponent } from './encarrec/encarrec-create/encarrec-create.component';
import {Utils} from './utils/utils';



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
    ReservaEditComponent,
    ReservaDetailComponent,
    ReservaDeleteComponent,
    EncarrecComponent,
    EncarrecCreateComponent,
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
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    MatCheckboxModule,
  ],
  providers: [
    AuthenticationService,
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'},
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    Utils
  ],
  bootstrap: [AppComponent],
  entryComponents: [EditEmployeesDialogComponent,DeleteEmployeDialogComponent,RegisterComponent,ReservaCreateComponent,
    ReservaEditComponent,ReservaDeleteComponent,ReservaDetailComponent,EncarrecCreateComponent]
})
export class AppModule { }
