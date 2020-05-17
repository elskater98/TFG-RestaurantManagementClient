import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {MenjarService} from '../../services/menjar.service';
import {ProductService} from '../../services/product.service';
import {DatePipe} from '@angular/common';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-food-delete',
  templateUrl: './food-delete.component.html',
  styleUrls: ['./food-delete.component.css']
})
export class FoodDeleteComponent implements OnInit {


  constructor(private matSnackBar: MatSnackBar,
              private menjarService:MenjarService,
              public dialogRef: MatDialogRef<FoodDeleteComponent>,
              private authenticationService:AuthenticationService,
              @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
  }

  delete(id){
    this.menjarService.delete(id).subscribe(()=>{
      console.log(id + " has been deleted successfully.");
      this.dialogRef.close();
    },error => {
      this.matSnackBar.open(error['error']['error']+':'+error['status'],'Close',{
        duration:2000});
    })
  }
}
