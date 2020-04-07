import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule, MatSelectModule,
  MatSidenavModule, MatSnackBar, MatSnackBarModule, MatTableModule,
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
        MatDialogModule
    ],
  providers: [
    AuthenticationService
  ],
  bootstrap: [AppComponent],
  entryComponents: [EditEmployeesDialogComponent,DeleteEmployeDialogComponent]
})
export class AppModule { }
