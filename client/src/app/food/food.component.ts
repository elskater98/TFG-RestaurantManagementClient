import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {DatePipe} from '@angular/common';

import {FoodCreateComponent} from './food-create/food-create.component';
import {MenjarService} from '../services/menjar.service';
import {EncarrecCreateComponent} from '../encarrec/encarrec-create/encarrec-create.component';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})
export class FoodComponent implements OnInit {
  public createDialogRef: MatDialogRef<FoodCreateComponent>;
  /*public detailDialogRef: MatDialogRef<EncarrecDetailComponent>;
  public deleteDialogRef: MatDialogRef<EncarrecDeleteComponent>;
  public editDialogRef: MatDialogRef<EncarrecEditComponent>;*/

  constructor(private router: Router,
              private authService: AuthenticationService,
              private matSnackBar: MatSnackBar,
              public dialog: MatDialog,
              private datePipe: DatePipe,
              private menjarService:MenjarService) { }

  ngOnInit() {

  }

  createFood(){
    this.createDialogRef = this.dialog.open(FoodCreateComponent,{
      height: '675px',
      width: '1200px',
      data:{
      }
    });
    //this.createDialogRef.afterClosed().subscribe((data)=> this.getAllEncarrecs());
  }

}
