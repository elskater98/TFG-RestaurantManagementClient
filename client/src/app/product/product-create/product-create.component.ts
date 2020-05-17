import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {MenjarService} from '../../services/menjar.service';
import {ProductService} from '../../services/product.service';
import {DatePipe} from '@angular/common';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  productForm:FormGroup;
  selectTypes:string[]=['Food','Office','Tools','Unknown','Clothes','Cutlery'].sort();

  constructor(    private fb: FormBuilder,
                  private matSnackBar: MatSnackBar,
                  private productService: ProductService,
                  public dialogRef: MatDialogRef<ProductCreateComponent>,
                  private authenticationService:AuthenticationService,
                  @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
    this.productForm = this.fb.group({
      name:new FormControl('', [Validators.required,Validators.maxLength(64)]),
      type:new FormControl('',[Validators.required,Validators.maxLength(64)]),
      description:new FormControl('',Validators.maxLength(512)),
    });

  }

  createProduct(){
    this.productService.createProduct(this.productForm.value).subscribe((data) => {
      console.log(data);
    },(error) => {
      this.matSnackBar.open(error['error']['error']+':'+error['status'],'Close',{
        duration:2000});
    });
    this.dialogRef.close();
  }



}
