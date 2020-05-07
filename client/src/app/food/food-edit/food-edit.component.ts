import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {MenjarService} from '../../services/menjar.service';
import {AuthenticationService} from '../../services/authentication.service';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../../environments/environment.prod';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-food-edit',
  templateUrl: './food-edit.component.html',
  styleUrls: ['./food-edit.component.css']
})
export class FoodEditComponent implements OnInit {
  foodForm:FormGroup;
  products:FormArray;
  productList:any;
  selectTypes:string[]=['Unknown','Rations','Tapas','Sandwiches','Pasta', 'Pizzas','Combined Dishes','Soft drinks','Hard drinks','Salads','Fish','Meat'].sort();


  constructor(private matSnackBar: MatSnackBar,
              private menjarService:MenjarService,
              public dialogRef: MatDialogRef<FoodEditComponent>,
              private fb: FormBuilder,
              private productService: ProductService,
              private authenticationService:AuthenticationService,
              private cdRef:ChangeDetectorRef,
              private changeDetectorRef: ChangeDetectorRef,
              @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
    this.getAllProducts();

    this.foodForm = this.fb.group({
      name:new FormControl(this.data.menjar.name, [Validators.required,Validators.maxLength(64)]),
      type:new FormControl(this.data.menjar.type,[Validators.required,Validators.maxLength(64)]),
      description:new FormControl(this.data.menjar.description?null:'',Validators.maxLength(512)),
      ingredients:this.fb.array([])
    });

    this.initialItems();

  }

  editFood(){
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


    this.menjarService.edit(this.data.menjar.id,menjar).subscribe((data)=>{
      console.log(data);
    },()=>{
      this.matSnackBar.open('Edit Food error: 400 Bad Request','Close',{
        duration:2000});
    });
    this.dialogRef.close();

  }

  getAllProducts(){
    this.productService.getAllProducts().subscribe((data)=>{
      this.productList = data.filter((e)=>e['type']==='Food');
      console.log(this.productList);
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

  initialItems(){
    this.products=this.foodForm.get('ingredients') as FormArray;
    for(let i=0;i<this.data.menjar.ingredients.length;i++){
      this.products.push(this.fb.group({
        name:this.data.menjar.ingredients[i].name,
      },Validators.required))
    }
  }
}
