import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {MatDialog, MatDialogRef, MatSnackBar, MatTableDataSource, Sort} from '@angular/material';
import {DatePipe} from '@angular/common';

import {FoodCreateComponent} from './food-create/food-create.component';
import {MenjarService} from '../services/menjar.service';
import {FoodDeleteComponent} from './food-delete/food-delete.component';
import {FoodEditComponent} from './food-edit/food-edit.component';
import {FoodDetailComponent} from './food-detail/food-detail.component';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})
export class FoodComponent implements OnInit {
  public createDialogRef: MatDialogRef<FoodCreateComponent>;
  public deleteDialogRef: MatDialogRef<FoodDeleteComponent>;
  public editDialogRef: MatDialogRef<FoodEditComponent>;
  public detailDialogRef: MatDialogRef<FoodDetailComponent>;


  public displayedColumns: string[] = ['position', 'name', 'type', 'enable', 'detail', 'edit', 'delete'];
  public dataSource: MatTableDataSource<any>;

  public listMenjars = [];

  constructor(private router: Router,
              private authService: AuthenticationService,
              private matSnackBar: MatSnackBar,
              public dialog: MatDialog,
              private datePipe: DatePipe,
              private menjarService: MenjarService) {
  }

  ngOnInit() {
    this.getAllMenjars();

  }

  createFood() {
    this.createDialogRef = this.dialog.open(FoodCreateComponent, {
      height: '450px',
      width: '1000px',
      data: {}
    });
    this.createDialogRef.afterClosed().subscribe(() => this.getAllMenjars());
  }

  getAllMenjars() {
    this.menjarService.getAllMenjars().subscribe((data) => {
      let aux = [];
      for (const {index, i} of data.map((i, index) => ({index, i}))) {
        let menjar = {
          position: index + 1,
          id: i['id'],
          name: i['name'],
          type: i['type'],
          description: i['description'],
          enable: i['enable'],
          ingredients: i['ingredients']
        };
        aux.push(menjar);
      }
      //console.log(aux);
      this.listMenjars = aux;
      this.dataSource = new MatTableDataSource<any>(aux);

    }, error => {
      this.matSnackBar.open('Food error: 404 Not Found', 'Close', {
        duration: 2000
      })
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  detail(menjar: any) {
    this.detailDialogRef = this.dialog.open(FoodDetailComponent, {
      height: '450px',
      width: '1000px',
      data: {
        menjar:menjar
      }
    });

    this.detailDialogRef.afterClosed().subscribe(() => this.getAllMenjars());

  }

  edit(menjar: any) {
    this.editDialogRef = this.dialog.open(FoodEditComponent, {
      height: '450px',
      width: '1000px',
      data: {
        menjar:menjar
      }
    });
    this.editDialogRef.afterClosed().subscribe(() => this.getAllMenjars());

  }

  delete(menjar: any) {
    this.deleteDialogRef = this.dialog.open(FoodDeleteComponent, {
      height: '450px',
      width: '1000px',
      data: {
        id: menjar['id'],
        name: menjar['name'],
        type: menjar['type'],
        enable: menjar['enable']
      }
    });
    this.deleteDialogRef.afterClosed().subscribe(() => this.getAllMenjars());
  }
}
