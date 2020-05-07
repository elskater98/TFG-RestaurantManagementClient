import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {ProductService} from '../../services/product.service';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  constructor(  private matSnackBar: MatSnackBar,
                private productService: ProductService,
                public dialogRef: MatDialogRef<ProductDeleteComponent>,
                private authenticationService:AuthenticationService,
                @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
  }

  delete() {
  let id = this.data.product['id'];
    this.productService.deleteProduct(id).subscribe(()=>{
      console.log("The product "+id+ " has been deleted successfully.");
      this.dialogRef.close();
    },error => {
      this.matSnackBar.open('Delete ' + id + ' failed.', 'Close', {
        duration: 2000
      });
    });

  }
}
