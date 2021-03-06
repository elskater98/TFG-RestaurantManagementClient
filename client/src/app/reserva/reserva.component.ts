import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MatSnackBar, MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {ReservaCreateComponent} from './reserva-create/reserva-create.component';
import {ReservaService} from '../services/reserva.service';
import {DatePipe} from '@angular/common';
import {environment} from '../../environments/environment.prod';
import {error} from 'util';
import {ReservaEditComponent} from './reserva-edit/reserva-edit.component';
import {ReservaDeleteComponent} from './reserva-delete/reserva-delete.component';
import {ReservaDetailComponent} from './reserva-detail/reserva-detail.component';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})

export class ReservaComponent implements OnInit {
  public newReservaDialogRef: MatDialogRef<ReservaCreateComponent>;
  public editReservaDialogRef: MatDialogRef<ReservaEditComponent>;
  public deleteReservaDialogRef: MatDialogRef<ReservaDeleteComponent>;
  public detailReservaDialogRef: MatDialogRef<ReservaDetailComponent>;

  public listReservasOutside:any;
  public listReservasInside:any;
  public date:Date;
  public isDay:boolean;
  public displayedColumns:string[]=['position','client','people','hour','observations','detail','edit','delete'];
  public dataSourceInside: MatTableDataSource<any>;
  public dataSourceOutside: MatTableDataSource<any>;
  public maxInside: number;
  public maxOutside: number;
  public isInside:boolean;
  private totalPeopleInside: number;
  private totalPeopleOutside: number;
  public canCreate:boolean;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private reservaService: ReservaService,
    private matSnackBar: MatSnackBar,
    public dialog: MatDialog,
    private datePipe: DatePipe,
  ) { }

  ngOnInit() {

    this.authService.isUserInRole('CUINER')?this.canCreate=true:this.canCreate=false;
    this.listReservasInside=[];
    this.listReservasOutside=[];
    this.date= new Date();
    this.isDay=this.getDay();
    this.getReservas();
    this.totalPeopleInside=0;
    this.totalPeopleOutside=0;
    this.maxInside= environment.insite;
    this.maxOutside= environment.outsite;
    this.isInside=true;
  }

  newReserva(){
    this.newReservaDialogRef = this.dialog.open(ReservaCreateComponent,{
      height: '800px',
      width: '600px',
      data:{
        maxPI:this.maxInside-this.totalPeopleInside,
        maxPO:this.maxOutside-this.totalPeopleOutside
      }
    });
    this.newReservaDialogRef.afterClosed().subscribe(()=> this.getReservas());
  }

  editReserva(current){
    this.editReservaDialogRef= this.dialog.open(ReservaEditComponent,{
      height: '800px',
      width: '600px',
      data:{
        id:current['id'],
        client:current['client'],
        people:current['people'],
        date:current['date'],
        hour:current['hour'],
        inside:current['inside'],
        mobile:current['mobile'],
        email:current['email'],
        observations:current['observations']
      }
    });
    this.editReservaDialogRef.afterClosed().subscribe(()=> this.getReservas());
  }

  delete(current){
    this.deleteReservaDialogRef= this.dialog.open(ReservaDeleteComponent,{
      height: '650px',
      width: '600px',
      data:{
        id:current['id'],
        client:current['client'],
        people:current['people'],
        date:current['date'],
        hour:current['hour'],
      }
    });
    this.deleteReservaDialogRef.afterClosed().subscribe(()=> this.getReservas());

  }

  detail(current){
    this.detailReservaDialogRef= this.dialog.open(ReservaDetailComponent,{
      height: '650px',
      width: '1200px',
      data:{
        id:current['id'],
        client:current['client'],
        people:current['people'],
        date:current['date'],
        hour:current['hour'],
        inside:current['inside'],
        mobile:current['mobile'],
        email:current['email'],
        observations:current['observations']
      }
    });
    this.detailReservaDialogRef.afterClosed().subscribe(()=> this.getReservas());

  }

  getReservas(){
    let aux = this.isDay ? " Lunch":" Diner";
    let subId= this.generateSubId(this.date);

    this.reservaService.findBySubIdAndInside(subId+aux).subscribe((data:any) =>{
      data.sort((a,b)=>(a['hour']>b['hour'])?1:-1);
      let aux_list=[];
      for(let i=0; i<data.length;i++){
        aux_list.push({
          'position':i+1,
          'id': data[i]['id'],
          'client': data[i]['client'],
          'people': data[i]['people'],
          'subId': data[i]['subId'],
          'date': data[i]['date'],
          'dateString':this.datePipe.transform(data[i]['dateString'], 'dd-MM-yyyy'),
          'hour': data[i]['hour'],
          'inside':data[i]['inside'],
          'mobile':data[i]['mobile'],
          'email':data[i]['email'],
          'observations':data[i]['observations']
        });
      }
      this.listReservasInside=aux_list;
      this.dataSourceInside = new MatTableDataSource<any>(aux_list);
      this.countPeopleInside(aux_list);
      //console.log(JSON.stringify(this.listReservas));
    },(error)=>{
      this.matSnackBar.open(error['error']['error']+':'+error['status'],'Close',{
        duration:2000});
    });

    this.reservaService.findBySubIdAndOutside(subId+aux).subscribe((data:any) =>{
      let aux_list=[];
      for(let i=0; i<data.length;i++){
        aux_list.push({
          'position':i+1,
          'id': data[i]['id'],
          'client': data[i]['client'],
          'people': data[i]['people'],
          'subId': data[i]['subId'],
          'date': data[i]['date'],
          'dateString':this.datePipe.transform(data[i]['dateString'], 'dd-MM-yyyy'),
          'hour': data[i]['hour'],
          'inside':data[i]['inside'],
          'mobile':data[i]['mobile'],
          'email':data[i]['email'],
          'observations':data[i]['observations']
        });
      }
      this.listReservasOutside=aux_list;
      this.dataSourceOutside = new MatTableDataSource<any>(aux_list);
      this.countPeopleOutside(aux_list);
      //console.log(JSON.stringify(this.listReservas));
    },(error)=>{
      this.matSnackBar.open(error['error']['error']+':'+error['status'],'Close',{
        duration:2000});
    });
  }


  generateSubId(date:Date){
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  changeIsDay(){
    this.isDay = !this.isDay;
    this.getReservas();
  }

  countPeopleInside(list:any){
    let count = 0;
    for(let i of list){
      count+=i['people'];
    }
    this.totalPeopleInside= count;
  }
  countPeopleOutside(list:any){
    let count = 0;
    for(let i of list){
      count+=i['people'];
    }
    this.totalPeopleOutside= count;
  }

  applyFilterInside(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceInside.filter = filterValue.trim().toLowerCase();
  }
  applyFilterOutside(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceOutside.filter = filterValue.trim().toLowerCase();
  }

  getObservarions(observation:string){
    return observation.length<32 ? observation : observation.substring(0,32)+'...';

  }

  getDay(){
    let x = Number(this.datePipe.transform(new Date(), 'HH'));
    return x >= 8 && x <= 16;
  }
}
