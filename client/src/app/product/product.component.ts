import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {DatePipe} from '@angular/common';
import {MenjarService} from '../services/menjar.service';
import {ProductService} from '../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  listProduct:[];

  constructor(private router: Router,
              private authService: AuthenticationService,
              private matSnackBar: MatSnackBar,
              public dialog: MatDialog,
              private productService: ProductService) { }

  ngOnInit() {
    this.productService.getAllProducts().subscribe((data)=>{
      console.log(data);
    })

  }

  createProduct(){

  }

  editProduct(){

  }

  deleteProduct(){

  }

  detailProduct(){

  }

}
