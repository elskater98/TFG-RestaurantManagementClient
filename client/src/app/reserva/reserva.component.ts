import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {ReservaCreateComponent} from './reserva-create/reserva-create.component';
import {ReservaService} from '../services/reserva.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})

export class ReservaComponent implements OnInit {
  public newReservaDialogRef: MatDialogRef<ReservaCreateComponent>;
  public listReservas:any;
  public date:Date;

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


  }

  newReserva(){
    this.newReservaDialogRef = this.dialog.open(ReservaCreateComponent,{
      height: '800px',
      width: '600px',
    });
  }

  getReservasInsite(time:boolean){
    let aux = time ? " Lunch":" Diner";
    let subId= this.generateSubId(this.date);

    this.reservaService.findBySubIdAndInside(subId+aux).subscribe(data=>{
      this.listReservas=data;
      console.log(JSON.stringify(this.listReservas));
    },()=>{
      this.matSnackBar.open('Reserva error','Close',{
        duration:2000});
    })
  }

  generateSubId(date:Date){
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }






}
