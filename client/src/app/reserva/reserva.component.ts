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
  public listReservas:any;
  public date:Date;
  public isDay:boolean;
  public inside:boolean;
  public displayedColumns:string[]=['position','client','people','hour','observations'];
  public dataSource: MatTableDataSource<any>;
  public totalPeople:number;
  public maxInsite: number;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private reservaService: ReservaService,
    private matSnackBar: MatSnackBar,
    public dialog: MatDialog,
    private datePipe: DatePipe,
  ) { }

  ngOnInit() {
    this.listReservas=[];
    this.date= new Date();
    this.isDay=true;
    this.inside=true;
    this.getReservasInsite();
    this.totalPeople=0;
    this.maxInsite= environment.insite;
  }

  newReserva(){
    this.newReservaDialogRef = this.dialog.open(ReservaCreateComponent,{
      height: '800px',
      width: '600px',
    });
    this.newReservaDialogRef.afterClosed().subscribe(()=> this.getReservasInsite());
  }

  getReservasInsite(){
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
      this.listReservas=aux_list;
      this.dataSource = new MatTableDataSource<any>(aux_list);
      console.log(JSON.stringify(this.listReservas));
    },()=>{
      this.matSnackBar.open('Reserva error','Close',{
        duration:2000});
    })
  }

  generateSubId(date:Date){
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  changeIsDay(){
    this.isDay = !this.isDay;
    this.getReservasInsite();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
