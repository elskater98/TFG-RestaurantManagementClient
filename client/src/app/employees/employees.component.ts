import {Component, Injectable, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {MatDialog, MatDialogRef, MatSnackBar, MatTableDataSource} from '@angular/material';
import {UserService} from '../services/user.service';
import {User} from '../authentication/User';
import {EditEmployeesDialogComponent} from './edit-employees-dialog/edit-employees-dialog.component';
import {filter} from 'rxjs/operators';
import {DeleteEmployeDialogComponent} from './delete-employe-dialog/delete-employe-dialog.component';
import {RegisterComponent} from '../register/register.component';


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],

})
export class EmployeesComponent implements OnInit {

 public userList:any[] = [];

 public displayedColumns:string[]=['position','name','surname','email','role','enabled','edit','delete'];
 public dataSource: MatTableDataSource<any>;
 public editDialogRef: MatDialogRef<EditEmployeesDialogComponent>;
 public deleteDialogRef: MatDialogRef<DeleteEmployeDialogComponent>;
 public registerDialogRef: MatDialogRef<RegisterComponent>;

  constructor(private router: Router,
              private authService: AuthenticationService,
              private matSnackBar: MatSnackBar,
              private userService: UserService,
              public dialog: MatDialog) {}

  ngOnInit() {

    this.getAllUsers();
    //console.log(this.userList);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAllUsers(){
    this.userService.getAllUsers().subscribe((list:any) => {
      let aux_list=[];
      let users = list['_embedded']['users'];
      for(let i=0; i< users.length;i++){
        aux_list.push({
          'position':i+1,
          'username':users[i]['username'],
          'name':users[i]['name'],
          'surname':users[i]['surname'],
          'email':users[i]['email'],
          'role':users[i]['role'],
          'enabled':users[i]['enabled']
        });
      }
      this.userList = aux_list;
      this.dataSource = new MatTableDataSource<any>(aux_list);
      console.log(this.userList);
    },error => {
      this.matSnackBar.open('Server Error','Close',{
        duration:2000});
    });
  }


  delete(current:any){

    this.deleteDialogRef = this.dialog.open(DeleteEmployeDialogComponent,{
      height: '250px',
      width: '600px',
      data:{
        username:current['username'],
        name:current['name'],
        surname:current['surname']
      }
    });

    this.deleteDialogRef.afterClosed().subscribe(()=> this.getAllUsers());
  }

  register(){
    this.registerDialogRef = this.dialog.open(RegisterComponent,{
      height: '600px',
      width: '600px',
    });
    this.registerDialogRef.afterClosed().subscribe(()=> this.getAllUsers());
  }

  edit(current:any){

    this.editDialogRef = this.dialog.open(EditEmployeesDialogComponent,{
      height: '500px',
      width: '600px',
      data:{
        username:current['username'],
        name:current['name'],
        surname:current['surname'],
        email:current['email'],
        role:current['role'],
        enabled:current['enabled']
      }
    });
    this.editDialogRef.afterClosed().subscribe(()=> this.getAllUsers())
  }

}
