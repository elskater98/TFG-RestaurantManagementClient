import {Component, Inject, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {EncarrecService} from '../../services/encarrec.service';

@Component({
  selector: 'app-encarrec-delete',
  templateUrl: './encarrec-delete.component.html',
  styleUrls: ['./encarrec-delete.component.css']
})
export class EncarrecDeleteComponent implements OnInit {

  public encarrec:any;
  public date:string;
  constructor(private datePipe: DatePipe,
              private encarrecService:EncarrecService,
              public dialogRef: MatDialogRef<EncarrecDeleteComponent>,
              private matSnackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
    this.encarrec = this.data.encarrec;
    this.date = this.datePipe.transform(this.encarrec.date, 'dd/MM/yyyy');
  }

  generateStringMenjarQuantity(encarrec:any){
    let string=[];
    for(let i=0;i<encarrec['menjars'].length;i++){
      string.push(encarrec['menjars'][i]+' : '+encarrec['quantity'][i]+' unit/s');
    }
    return string;
  }

  delete(id:string){
    this.encarrecService.delete(id).subscribe(()=>{
      console.log(id + " has been deleted successfully.");
      this.dialogRef.close();
    },error => {
      this.matSnackBar.open(error['error']['error']+':'+error['status'],'Close',{
        duration:2000});
    })
  }

}
