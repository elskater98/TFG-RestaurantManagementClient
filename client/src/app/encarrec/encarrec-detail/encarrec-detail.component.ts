import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-encarrec-detail',
  templateUrl: './encarrec-detail.component.html',
  styleUrls: ['./encarrec-detail.component.css']
})
export class EncarrecDetailComponent implements OnInit {
  public encarrec:any;
  public date:string;
  constructor(private datePipe: DatePipe,
              public dialogRef: MatDialogRef<EncarrecDetailComponent>,
              @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {

    this.encarrec = this.data.encarrec;
    console.log(this.encarrec);
    this.date = this.datePipe.transform(this.encarrec.date, 'dd/MM/yyyy');
  }

  generateStringMenjarQuantity(encarrec:any){
    let string=[];
    for(let i=0;i<encarrec['menjars'].length;i++){
      string.push(encarrec['menjars'][i]+' : '+encarrec['quantity'][i]+' unit/s');
    }
    return string;
  }

}
