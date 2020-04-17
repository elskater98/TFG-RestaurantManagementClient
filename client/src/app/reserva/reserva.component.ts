import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {ReservaCreateComponent} from './reserva-create/reserva-create.component';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})

export class ReservaComponent implements OnInit {
  public newReservaDialogRef: MatDialogRef<ReservaCreateComponent>;
  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private matSnackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit() {

  }

  newReserva(){
    this.newReservaDialogRef = this.dialog.open(ReservaCreateComponent,{
      height: '800px',
      width: '600px',
    });


  }

}
