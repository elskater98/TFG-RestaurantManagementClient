import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import {ReservaService} from '../../services/reserva.service';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-reserva-edit',
  templateUrl: './reserva-edit.component.html',
  styleUrls: ['./reserva-edit.component.css']
})
export class ReservaEditComponent implements OnInit {
  public currentReserva:FormGroup;
  minDate:Date;

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthenticationService,
              private reservaService: ReservaService,
              private matSnackBar: MatSnackBar,
              private datePipe: DatePipe,
              public dialogRef: MatDialogRef<ReservaEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
    this.minDate = new Date();

    this.currentReserva = this.fb.group({
      client:new FormControl(this.data.client, [Validators.required,Validators.maxLength(64), Validators.minLength(1)]),
      people:new FormControl(this.data.people,[Validators.required,Validators.max(64), Validators.min(1)]),
      date:new FormControl(this.data.date,Validators.required),
      inside:new FormControl(this.data.inside,Validators.required),
      mobile:new FormControl(this.data.mobile,Validators.maxLength(32)),
      email:new FormControl(this.data.email,Validators.email),
      observations:new FormControl(this.data.observations,Validators.maxLength(512)),
      hour:new FormControl(this.data.hour,Validators.required),
    });
  }

  edit(){
    let reserva = this.currentReserva.value;
    reserva['date']=this.datePipe.transform(reserva['date'], 'yyyy-MM-dd');

    this.reservaService.update(this.data.id,reserva).subscribe(() => {
      console.log(this.data.id+" has been update successfully.");
      this.dialogRef.close();
    },error => {
      this.matSnackBar.open(error['error']['error']+':'+error['status'],'Close',{
        duration:2000});
    });
  }

}
