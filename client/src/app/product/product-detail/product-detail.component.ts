import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {ProductService} from '../../services/product.service';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  constructor(
               public dialogRef: MatDialogRef<ProductDetailComponent>,
               @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
  }

}
