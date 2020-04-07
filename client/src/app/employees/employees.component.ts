import {Component, Injectable, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {MatDialog, MatDialogRef, MatSnackBar, MatTableDataSource} from '@angular/material';
import {UserService} from '../services/user.service';
import {User} from '../authentication/User';
import {EditEmployeesDialogComponent} from './edit-employees-dialog/edit-employees-dialog.component';
import {filter} from 'rxjs/operators';


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
      let users = list['_embedded']['users'];
      for(let i=0; i< users.length;i++){
        this.userList.push({
          'position':i+1,
          'username':users[i]['username'],
          'name':users[i]['name'],
          'surname':users[i]['surname'],
          'email':users[i]['email'],
          'role':users[i]['role'],
          'enabled':users[i]['enabled']
        });
      }
      this.dataSource = new MatTableDataSource<any>(this.userList);
      console.log(this.userList);
    },error => {
      this.matSnackBar.open('Server Error','Close',{
        duration:2000});
    });
  }

  refresh(){
    this.dataSource= new MatTableDataSource<any>();
    this.userList=[];
    this.getAllUsers();
  }

  delete(username:string){
    if(this.authService.isLoggedIn() && (this.authService.isUserInRole('Admin')
      ||this.authService.isUserInRole('Propietari'))){
      this.userService.deleteUser(username).subscribe(res=>{
        console.log(username+" has been deleted successfully.");
        this.refresh();
      },error => {
        this.matSnackBar.open('Delete '+username+' failed.','Close',{
          duration:2000});
      });
    }else{
      this.matSnackBar.open('Unauthorized','Close',{
        duration:2000});
    }

  }

  edit(username:string){
    let current;
    for(let i of this.userList){
      if(i['username']===username){
        current=i;
        break;
      }
    }

    this.editDialogRef = this.dialog.open(EditEmployeesDialogComponent,{
      height: '400px',
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

  }

}
