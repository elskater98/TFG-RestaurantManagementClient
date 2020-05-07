import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {ProductService} from '../../services/product.service';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  productForm:FormGroup;
  selectTypes:string[]=['Food','Office','Tools','Unknown','Clothes','Cutlery'].sort();

  constructor(    private fb: FormBuilder,
                  private matSnackBar: MatSnackBar,
                  private productService: ProductService,
                  public dialogRef: MatDialogRef<ProductEditComponent>,
                  private authenticationService:AuthenticationService,
                  @Inject(MAT_DIALOG_DATA) public data) { }


  ngOnInit() {
    this.productForm = this.fb.group({
      name:new FormControl(this.data.product.name, [Validators.required,Validators.maxLength(64)]),
      type:new FormControl(this.data.product.type,[Validators.required,Validators.maxLength(64)]),
      description:new FormControl(this.data.product.description,Validators.maxLength(512)),
      blackList:new FormControl(this.data.product.blackList),
      active:new FormControl(this.data.product.active)
    });

    console.log(this.productForm.value);
  }

  editProduct(){

    this.productService.editProduct(this.data.product['id'],this.productForm.value).subscribe((data) => {
      console.log(data);
    },() => {
      this.matSnackBar.open('Edit Product error: 400 Bad Request', 'Close', {
        duration: 2000
      });
    });
    this.dialogRef.close();
  }

}
