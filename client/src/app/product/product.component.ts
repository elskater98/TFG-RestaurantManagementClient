import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {MatDialog, MatDialogRef, MatSnackBar, MatTableDataSource} from '@angular/material';
import {DatePipe} from '@angular/common';
import {MenjarService} from '../services/menjar.service';
import {ProductService} from '../services/product.service';
import {FoodCreateComponent} from '../food/food-create/food-create.component';
import {ProductCreateComponent} from './product-create/product-create.component';
import {ProductDeleteComponent} from './product-delete/product-delete.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  public listProduct=[];

  public createDialogRef: MatDialogRef<ProductCreateComponent>;
  public deleteDialogRef: MatDialogRef<ProductDeleteComponent>;

  public displayedColumns: string[] = ['position', 'name', 'type', 'active', 'detail', 'edit', 'delete'];
  public dataSource: MatTableDataSource<any>;

  constructor(private router: Router,
              private authService: AuthenticationService,
              private matSnackBar: MatSnackBar,
              public dialog: MatDialog,
              private productService: ProductService) { }

  ngOnInit() {
    this.getAllProducts();
  }

  createProduct(){
    this.createDialogRef = this.dialog.open(ProductCreateComponent, {
      height: '400px',
      width: '500px'
    });
    this.createDialogRef.afterClosed().subscribe(() => this.getAllProducts());

  }

  editProduct(product){

  }

  deleteProduct(product){
    this.deleteDialogRef = this.dialog.open(ProductDeleteComponent, {
      height: '400px',
      width: '500px',
      data:{product:product}
    });

    this.deleteDialogRef.afterClosed().subscribe(() => this.getAllProducts());
  }

  detailProduct(product){

  }

  cart(){

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  changeActive(product){
    this.productService.editProduct(product['id'],{'active':!product['active']}).subscribe(()=>{
        console.log('Successfully change: '+product['id']+' -> State: '+product['active']);
        this.getAllProducts();
    },error => {
      this.matSnackBar.open('Product error: 400 Bad Request', 'Close', {
        duration: 2000
      })
    });
  }

  getAllProducts(){
    this.productService.getAllProducts().subscribe((data)=>{
      let aux = [];
      for (const {index, i} of data.map((i, index) => ({index, i}))) {
        let menjar = {
          position: index + 1,
          id: i['id'],
          name: i['name'],
          type: i['type'],
          description: i['description'],
          active: i['active']
        };
        aux.push(menjar);
      }
      this.listProduct = aux;
      this.dataSource = new MatTableDataSource<any>(aux);
    },error => {
      this.matSnackBar.open('Product error: 404 Not Found', 'Close', {
        duration: 2000
      })
    })
  }
}
