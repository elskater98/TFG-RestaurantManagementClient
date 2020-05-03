import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {MenjarService} from '../../services/menjar.service';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.component.html',
  styleUrls: ['./food-detail.component.css']
})
export class FoodDetailComponent implements OnInit {

  constructor(private matSnackBar: MatSnackBar,
              private menjarService:MenjarService,
              public dialogRef: MatDialogRef<FoodDetailComponent>,
              private authenticationService:AuthenticationService,
              @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
    console.log(this.data);
  }

}
