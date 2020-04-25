import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {UserService} from '../services/user.service';
import {EncarrecCreateComponent} from './encarrec-create/encarrec-create.component';
import {EditEmployeesDialogComponent} from '../employees/edit-employees-dialog/edit-employees-dialog.component';

@Component({
  selector: 'app-encarrec',
  templateUrl: './encarrec.component.html',
  styleUrls: ['./encarrec.component.css']
})
export class EncarrecComponent implements OnInit {
  public createDialogRef: MatDialogRef<EncarrecCreateComponent>;

  constructor(private router: Router,
              private authService: AuthenticationService,
              private matSnackBar: MatSnackBar,
              public dialog: MatDialog) { }

  ngOnInit() {
  }

  createEncarrec(){

    this.createDialogRef = this.dialog.open(EncarrecCreateComponent,{
      height: '675px',
      width: '1200px',
      data:{
      }
    });
    this.createDialogRef.afterClosed().subscribe((data)=> console.log(data));
  }

}
