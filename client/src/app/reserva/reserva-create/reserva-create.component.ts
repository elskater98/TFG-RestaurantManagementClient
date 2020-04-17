import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {ReservaService} from '../../services/reserva.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-reserva-create',
  templateUrl: './reserva-create.component.html',
  styleUrls: ['./reserva-create.component.css']
})
export class ReservaCreateComponent implements OnInit {
  newReserva:FormGroup;
  minDate:Date;
  optional:boolean;

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthenticationService,
              private reservaService: ReservaService,
              private matSnackBar: MatSnackBar,
              private datePipe: DatePipe,
              public dialogRef: MatDialogRef<ReservaCreateComponent>,
              @Inject(MAT_DIALOG_DATA) public data) { }


  ngOnInit() {
    this.minDate = new Date();
    this.optional=false;

    this.newReserva = this.fb.group({
      client:new FormControl('', [Validators.required,Validators.maxLength(64), Validators.minLength(1)]),
      people:new FormControl(1,[Validators.required,Validators.max(64), Validators.min(1)]),
      date:new FormControl(new Date().toISOString(),Validators.required),
      inside:new FormControl(true,Validators.required),
      mobile:new FormControl('',Validators.maxLength(32)),
      email:new FormControl('',Validators.email),
      observations:new FormControl('',Validators.maxLength(512)),
      hour:new FormControl('13:00',Validators.required),
    });

  }

  createReserva(){

    let reserva = this.newReserva.value;
    reserva['date']=this.datePipe.transform(reserva['date'], 'yyyy-MM-dd');

    this.reservaService.newBook(reserva).subscribe(data=>{
      this.dialogRef.close();
    },()=>{
      this.matSnackBar.open('Reserva error','Close',{
        duration:2000});
    })
  }

}
