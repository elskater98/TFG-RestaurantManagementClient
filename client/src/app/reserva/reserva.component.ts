import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MatSnackBar, MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {ReservaCreateComponent} from './reserva-create/reserva-create.component';
import {ReservaService} from '../services/reserva.service';
import {DatePipe} from '@angular/common';
import {environment} from '../../environments/environment.prod';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})

export class ReservaComponent implements OnInit {
  public newReservaDialogRef: MatDialogRef<ReservaCreateComponent>;
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

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private reservaService: ReservaService,
    private matSnackBar: MatSnackBar,
    public dialog: MatDialog,
    private datePipe: DatePipe,
  ) { }

  ngOnInit() {
    this.listReservasInside=[];
    this.listReservasOutside=[];
    this.date= new Date();
    this.isDay=true;
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
    });
    this.newReservaDialogRef.afterClosed().subscribe(()=> this.getReservas());
  }

  getReservas(){
    let aux = this.isDay ? " Lunch":" Diner";
    let subId= this.generateSubId(this.date);

    this.reservaService.findBySubIdAndInside(subId+aux).subscribe((data:any) =>{
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
    },()=>{
      this.matSnackBar.open('Reserva error','Close',{
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
    },()=>{
      this.matSnackBar.open('Reserva error','Close',{
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
}
