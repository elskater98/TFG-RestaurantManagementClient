import {Component, Inject, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {ReservaService} from '../../services/reserva.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-reserva-detail',
  templateUrl: './reserva-detail.component.html',
  styleUrls: ['./reserva-detail.component.css']
})
export class ReservaDetailComponent implements OnInit {
  date:string;
  constructor(private authService: AuthenticationService,
              private matSnackBar: MatSnackBar,
              private reservaService: ReservaService,
              private datePipe: DatePipe,
              public dialogRef: MatDialogRef<ReservaDetailComponent>,
              @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
    this.date = this.datePipe.transform(this.data.date, 'dd/MM/yyyy');
  }

}
