import {Component, Inject, OnInit} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {FlatTreeControl} from '@angular/cdk/tree';

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.css']
})

export class ProductCartComponent implements OnInit {
  productTypes:string[]=['Food','Office','Tools','Unknown','Clothes','Cutlery'].sort();
  blackList=[];
  treeControl:FlatTreeControl<any>;
  treeFlattener:MatTreeFlattener<any, any>;
  dataSource:MatTreeFlatDataSource<any,any>;
  dataSourceBL:MatTreeFlatDataSource<any,any>;
  hasChild;

  private _transformer = (node: ProductNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };


  constructor(private productService:ProductService,
              private matSnackBar: MatSnackBar,
              public dialogRef: MatDialogRef<ProductCartComponent>) { }

  ngOnInit() {
    this.getToBuy();
    this.getBlackList();

    this.treeControl = new FlatTreeControl<FlatNode>(node => node.level, node => node.expandable);
    this.treeFlattener= new MatTreeFlattener(this._transformer, node => node.level, node => node.expandable, node => node.children);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    this.dataSourceBL = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    this.hasChild = (_: number, node: FlatNode) => node.expandable;
  }


  generateNode(list){
    let tree: ProductNode[]=[];
    for(let type of this.productTypes){
      if(this.filterNodes(type,list).length!=0){
        tree.push({
          name:type,
          children:this.filterNodes(type,list)
        })
      }
    }
    return tree;
  }

  filterNodes(type,list){
    let res=[];
    let aux = list.filter((e)=>e.type==type);
    for(let i of aux){
      res.push({'name':i.name,'id':i.id});
    }
    return res;
  }

  getToBuy(){
    this.productService.getToBuy().subscribe((data)=>{
      this.dataSource.data = this.generateNode(data);
    },() => {
      this.matSnackBar.open('Server Internal error: 500', 'Close', {
        duration: 2000
      });
    });

  }

  getBlackList(){
    this.productService.getBlackList().subscribe((data)=>{
      this.dataSourceBL.data = this.generateNode(data);
    },() => {
      this.matSnackBar.open('Server Internal error: 500', 'Close', {
        duration: 2000
      });
    });
  }

  bought(name) {
    this.productService.getProduct(name).subscribe((data)=>{
      this.productService.editProduct(data.id,{'active':!data.active}).subscribe(()=>{
        console.log("The item "+data.id+" active status changed.");
      })
    })
  }

  boughtAll(name){
    console.log(this.dataSource.data);

  }

  removeFromBL(name: any) {
    this.productService.getProduct(name).subscribe((data)=>{
      this.productService.editProduct(data.id,{'blackList':!data.blackList}).subscribe(()=>{
        console.log("The item "+data.id+" active status changed.");
      },() => {
        this.matSnackBar.open('Server Internal error: 500', 'Close', {
          duration: 2000
        });
      });
    },() => {
      this.matSnackBar.open('Server Internal error: 500', 'Close', {
        duration: 2000
      });
    });
  }
}

interface ProductNode {
  name:string;
  children?:ProductNode[];
}

interface FlatNode{
  expandable: boolean;
  name: string;
  level: number;
}
