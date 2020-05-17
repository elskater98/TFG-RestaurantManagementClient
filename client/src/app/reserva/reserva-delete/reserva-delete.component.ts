import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {AuthenticationService} from '../../services/authentication.service';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {ReservaService} from '../../services/reserva.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-reserva-delete',
  templateUrl: './reserva-delete.component.html',
  styleUrls: ['./reserva-delete.component.css']
})
export class ReservaDeleteComponent implements OnInit {

  date:string;
  constructor(
    private authService: AuthenticationService,
    private matSnackBar: MatSnackBar,
    private reservaService: ReservaService,
    private datePipe: DatePipe,
    public dialogRef: MatDialogRef<ReservaDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
  }

  ngOnInit() {
    this.date = this.datePipe.transform(this.data.date, 'dd/MM/yyyy');
  }

  delete() {

    let id = this.data.id;
    this.reservaService.delete(id).subscribe(res => {
      console.log(id + " has been deleted successfully.");
      this.dialogRef.close();
    }, error => {
      this.matSnackBar.open(error['error']['error']+':'+error['status'],'Close',{
        duration:2000});
    });
  }

}
