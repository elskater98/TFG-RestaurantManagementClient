import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {MenjarService} from '../../services/menjar.service';
import {DatePipe} from '@angular/common';
import {AuthenticationService} from '../../services/authentication.service';
import {ProductService} from '../../services/product.service';
import {environment} from '../../../environments/environment.prod';
import {error} from 'util';

@Component({
  selector: 'app-food-create',
  templateUrl: './food-create.component.html',
  styleUrls: ['./food-create.component.css']
})
export class FoodCreateComponent implements OnInit {

  foodForm:FormGroup;
  products:FormArray;
  productList:any;
  selectTypes:string[]=['Unknown','Rations','Tapas','Sandwiches','Pasta', 'Pizzas','Combined Dishes','Soft drinks','Hard drinks','Salads','Fish','Meat','Dessert'].sort();

  constructor(    private fb: FormBuilder,
                  private matSnackBar: MatSnackBar,
                  private menjarService:MenjarService,
                  private productService: ProductService,
                  private changeDetectorRef: ChangeDetectorRef,
                  private datePipe: DatePipe,
                  public dialogRef: MatDialogRef<FoodCreateComponent>,
                  private cdRef:ChangeDetectorRef,
                  private authenticationService:AuthenticationService,
                  @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
    this.getAllProducts();

    this.foodForm = this.fb.group({
      name:new FormControl('', [Validators.required,Validators.maxLength(64)]),
      type:new FormControl('',[Validators.required,Validators.maxLength(64)]),
      description:new FormControl('',Validators.maxLength(512)),
      ingredients:this.fb.array([this.initProduct()])
    });

  }

  createFood(){
    let url = environment.urlConf+'/productes/';
    let auxUrl=[];
    for(let i of this.foodForm.value.ingredients){
      let id = this.productList.filter(e =>  e.name.includes(i['name']));
      auxUrl.push(url+id[0]['id']);
    }


    let menjar={
      "name": this.foodForm.value.name,
      "type":  this.foodForm.value.type,
      "description":  this.foodForm.value.description,
      "enable": true,
      "ingredients":auxUrl
    };


    this.menjarService.create(menjar).subscribe((data)=>{
      console.log(data);
    },(error)=>{
      this.matSnackBar.open(error['error']['error']+':'+error['status'],'Close',{
        duration:2000});
    });
    this.dialogRef.close();

  }

  getAllProducts(){
  this.productService.getAllProducts().subscribe((data)=>{
    this.productList = data.filter((e)=>e['type']==='Food');
  },error=>{
    this.matSnackBar.open(error['error']['error']+':'+error['status'],'Close',{
      duration:2000});
  })
  }

  initProduct(){
    return this.fb.group({
      name:''
    },Validators.required)
  }

  addItem():void{
    this.products=this.foodForm.get('ingredients') as FormArray;
    this.products.push(this.initProduct());
    this.cdRef.detectChanges();
  }

  removeItem(i:number):void{
    if(i > 0){
      this.products.removeAt(i);
    }
  }

}
