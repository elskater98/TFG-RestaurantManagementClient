import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {MatDialog, MatDialogRef, MatSnackBar, MatTableDataSource} from '@angular/material';
import {EncarrecCreateComponent} from './encarrec-create/encarrec-create.component';
import {EncarrecService} from '../services/encarrec.service';
import {DatePipe} from '@angular/common';
import {EncarrecDetailComponent} from './encarrec-detail/encarrec-detail.component';
import {EncarrecDeleteComponent} from './encarrec-delete/encarrec-delete.component';
import {EncarrecEditComponent} from './encarrec-edit/encarrec-edit.component';
import {Utils} from '../utils/utils';


@Component({
  selector: 'app-encarrec',
  templateUrl: './encarrec.component.html',
  styleUrls: ['./encarrec.component.css']
})
export class EncarrecComponent implements OnInit {
  public createDialogRef: MatDialogRef<EncarrecCreateComponent>;
  public detailDialogRef: MatDialogRef<EncarrecDetailComponent>;
  public deleteDialogRef: MatDialogRef<EncarrecDeleteComponent>;
  public editDialogRef: MatDialogRef<EncarrecEditComponent>;


  public displayedColumns:string[]=['position','client','hour','menjars','observations','takeaway','detail','edit','delete','status'];
  public dataSourceToDo: MatTableDataSource<any>;
  public dataSourceDone: MatTableDataSource<any>;
  public encarrecList=[];
  private date:any;
  public canCreate:boolean;

  constructor(private router: Router,
              private authService: AuthenticationService,
              private matSnackBar: MatSnackBar,
              public dialog: MatDialog,
              private encarrecService:EncarrecService,
              private datePipe: DatePipe) { }

  ngOnInit() {
    this.authService.isUserInRole('CUINER')?this.canCreate=true:this.canCreate=false;
    this.date=new Date();
    this.getAllEncarrecs();
  }

  getAllEncarrecs(){
    this.encarrecService.getAll().subscribe((data)=>{
      data['_embedded']['encarrecs'].sort((a,b)=>(a['hour']>b['hour'])?1:-1);
      let encarrec=[];
      for(const { index, i } of data['_embedded']['encarrecs'].map((i, index) => ({ index, i }))){

        let menjars=[];

        for(let j of i['_embedded']['menjars']){
           menjars.push(j['name']);
        }

        let aux={
          "position":index+1,
          "id": i['id'],
          "clientUUID": i['clientUUID'],
          "client": i['client'],
          "date": i['date'],
          "dateString": i['dateString'],
          "hour":i['hour'],
          "mobile": i['mobile'],
          "takeaway":i['takeaway'],
          "email": i['email'],
          "quantity":i['quantity'].substring(0,i['quantity'].length-1).split(';'),
          "observations": i['observations'],
          "menjars":menjars,
          "employee":i['employee'],
          "status":i['status']
        };
        encarrec.push(aux);
      }
      this.encarrecList=encarrec.filter(e=>e.dateString.includes(this.datePipe.transform(this.date, 'yyyy-MM-dd')));
      this.dataSourceToDo = new MatTableDataSource<any>(this.encarrecList.filter(e=>e['status']==false));
      this.dataSourceDone = new MatTableDataSource<any>(this.encarrecList.filter(e=>e['status']==true));
    },(error)=>{
      this.matSnackBar.open(error['error']['error']+':'+error['status'],'Close',{
          duration:2000});
      });
  }

  generateStringMenjarQuantity(encarrec:any){
    let string=[];
    for(let i=0;i<encarrec['menjars'].length;i++){
      string.push(encarrec['menjars'][i]+' : '+encarrec['quantity'][i]+' unit/s');
    }
    return string;
  }

  changeStatus(encarrec:any){
    this.encarrecService.edit(encarrec['id'],{status:encarrec['status'] !== true}).subscribe((data)=>{
      console.log(data);
      this.getAllEncarrecs();
    })
  }

  createEncarrec(){

    this.createDialogRef = this.dialog.open(EncarrecCreateComponent,{
      height: '675px',
      width: '1200px',
      data:{
      }
    });
    this.createDialogRef.afterClosed().subscribe((data)=> this.getAllEncarrecs());
  }

  delete(encarrec:any){
    this.deleteDialogRef= this.dialog.open(EncarrecDeleteComponent,{
      height: '600px',
      width: '1200px',
      data:{
        "encarrec":encarrec
      }
    });
    this.deleteDialogRef.afterClosed().subscribe((data)=> this.getAllEncarrecs());
  }

  edit(encarrec:any){
    this.editDialogRef = this.dialog.open(EncarrecEditComponent,{
      height: '675px',
      width: '1200px',
      data:{
        encarrec:encarrec
      }
    });
    this.editDialogRef.afterClosed().subscribe((data)=> this.getAllEncarrecs());
  }

  detail(encarrec:any){
    this.detailDialogRef= this.dialog.open(EncarrecDetailComponent,{
      height: '600px',
      width: '1200px',
      data:{
        "encarrec":encarrec
      }
    });
    this.detailDialogRef.afterClosed().subscribe((data)=> this.getAllEncarrecs());
  }

  getObservarions(observation:string){
    return observation.length<32 ? observation : observation.substring(0,32)+'...';

  }

  applyFilterToDo(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceToDo.filter = filterValue.trim().toLowerCase();
  }

  applyFilterDone(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceDone.filter = filterValue.trim().toLowerCase();
  }


}
