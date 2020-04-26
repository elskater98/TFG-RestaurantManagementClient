import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {MatDialog, MatDialogRef, MatSnackBar, MatTableDataSource} from '@angular/material';
import {UserService} from '../services/user.service';
import {EncarrecCreateComponent} from './encarrec-create/encarrec-create.component';
import {EditEmployeesDialogComponent} from '../employees/edit-employees-dialog/edit-employees-dialog.component';
import {EncarrecService} from '../services/encarrec.service';

@Component({
  selector: 'app-encarrec',
  templateUrl: './encarrec.component.html',
  styleUrls: ['./encarrec.component.css']
})
export class EncarrecComponent implements OnInit {
  public createDialogRef: MatDialogRef<EncarrecCreateComponent>;
  public displayedColumns:string[]=['position','client','people','hour','observations','detail','edit','delete'];
  public dataSource: MatTableDataSource<any>;
  public encarrecList=[];

  constructor(private router: Router,
              private authService: AuthenticationService,
              private matSnackBar: MatSnackBar,
              public dialog: MatDialog,
              private encarrecService:EncarrecService) { }

  ngOnInit() {
    this.getAllEncarrecs();
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

  getAllEncarrecs(){
    this.encarrecService.getAll().subscribe((data)=>{
      let encarrec=[];
      for(let i of data['_embedded']['encarrecs']){

        let menjars=[];
        for(let j of i['_embedded']['menjars']){
           menjars.push(j['name']);
        }

        let aux={
          "id": i['id'],
          "clientUUID": i['clientUUID'],
          "client": i['clientUUID'],
          "date": i['date'],
          "dateString": i['dateString'],
          "hour":i['hour'],
          "delivery": i['delivery'],
          "mobile": i['mobile'],
          "email": i['email'],
          "quantity":i['quantity'].substring(0,i['quantity'].length-1).split(';'),
          "observations": i['observations'],
          "menjars":menjars
        };
        encarrec.push(aux);
      }
      this.encarrecList=encarrec;
      this.dataSource = new MatTableDataSource<any>(encarrec);
    },()=>{
      this.matSnackBar.open('Meals error: 404 Not Found','Close',{
          duration:2000});
      });
  }

}
