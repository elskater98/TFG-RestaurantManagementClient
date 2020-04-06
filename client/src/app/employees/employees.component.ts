import {Component, Injectable, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {MatSnackBar, MatTableDataSource} from '@angular/material';
import {UserService} from '../services/user.service';
import {User} from '../authentication/User';


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],

})
export class EmployeesComponent implements OnInit {

 public userList:any[] = [];

 public displayedColumns:string[]=['position','name','surname','email','role','enabled','edit','delete'];
 public dataSource: MatTableDataSource<any>;


  constructor(private router: Router,
              private authService: AuthenticationService,
              private matSnackBar: MatSnackBar,
              private userService: UserService) {}

  ngOnInit() {

    this.userService.getAllUsers().subscribe((list:any) => {
      let users = list['_embedded']['users'];
      for(let i=0; i< users.length;i++){
        this.userList.push({
          'position':i+1,
          'name':users[i]['name'],
          'surname':users[i]['surname'],
          'email':users[i]['email'],
          'role':users[i]['role'],
          'enabled':users[i]['enabled']
        });
      }
      this.dataSource = new MatTableDataSource<any>(this.userList);
      //console.log(this.userList);
    },error => {
      this.matSnackBar.open('Server Error','Close',{
        duration:2000});
    });
    console.log(this.userList);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  edit(){
    console.log("edit");
  }
  delete(){
    console.log("delete");
  }

}
