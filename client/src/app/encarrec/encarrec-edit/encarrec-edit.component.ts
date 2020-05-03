import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {MenjarService} from '../../services/menjar.service';
import {EncarrecService} from '../../services/encarrec.service';
import {DatePipe} from '@angular/common';
import {Utils} from '../../utils/utils';
import {environment} from '../../../environments/environment.prod';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-encarrec-edit',
  templateUrl: './encarrec-edit.component.html',
  styleUrls: ['./encarrec-edit.component.css']
})
export class EncarrecEditComponent implements OnInit{
  encarrecForm:FormGroup;
  minDate:Date;
  menjars:FormArray;
  menjarsList:any;

  constructor( private fb: FormBuilder,
               private matSnackBar: MatSnackBar,
               private menjarService:MenjarService,
               private encarrecService:EncarrecService,
               private changeDetectorRef: ChangeDetectorRef,
               private datePipe: DatePipe,
               public dialogRef: MatDialogRef<EncarrecEditComponent>,
               private cdRef:ChangeDetectorRef,
               public utils:Utils,
               private authenticationService:AuthenticationService,
               @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
    this.minDate = new Date();
    this.getMenjars();



    this.encarrecForm = this.fb.group({
      client:new FormControl(this.data.encarrec.client, [Validators.required,Validators.maxLength(64), Validators.minLength(1)]),
      date:new FormControl(this.data.encarrec.date,Validators.required),
      hour:new FormControl(this.data.encarrec.hour,Validators.required),
      mobile:new FormControl(this.data.encarrec.mobile,Validators.maxLength(32)),
      email:new FormControl(this.data.encarrec.email,Validators.email),
      observations:new FormControl(this.data.encarrec.observations,Validators.maxLength(512)),
      takeaway:new FormControl(this.data.encarrec.takeaway),
      menjars:this.fb.array([])
    });

    this.initialItems();
  }

  getMenjars(){
    this.menjarService.getAllMenjars().subscribe((data)=>{
      console.log(data);
      let aux=[];
      for(let i of  data){
        aux.push(i)
      }
      //console.log(aux);
      this.menjarsList=aux;
    });
  }

  editEncarrec(){
    let url = environment.urlConf+'/menjars/';

    let auxUrl=[];
    let quantityStr='';

    for(let i of this.encarrecForm.value.menjars){
      let id = this.menjarsList.filter(e =>  e.name.includes(i['menjar']));
      quantityStr=quantityStr+i['quantity']+';';
      auxUrl.push(url+id[0]['id']);
    }

    let employee= this.authenticationService.getCurrentUser();

    let encarrec={
      /*"clientUUID": this.utils.generateUUID(),*/
      "client": this.encarrecForm.value.client,
      "date": this.datePipe.transform(this.encarrecForm.value.date, 'yyyy-MM-dd'),
      "hour": this.encarrecForm.value.hour,
      "mobile": this.encarrecForm.value.mobile,
      "email": this.encarrecForm.value.email,
      "takeaway":this.encarrecForm.value.takeaway,
      "menjars":auxUrl,
      "quantity": quantityStr,
      "observations": this.encarrecForm.value.observations,
      "employee":employee['name']+' '+employee['surname']
    };

    this.encarrecService.edit(this.data.encarrec.id,encarrec).subscribe((data)=>{
      console.log(data);
    },()=>{
      this.matSnackBar.open('Takeaway error: 400 Bad Request','Close',{
        duration:2000});
    });
    this.dialogRef.close();

  }

  initMenjar(){
    return this.fb.group({
      menjar:'',
      quantity:''
    },Validators.required);
  }

  addItem():void{
    this.menjars=this.encarrecForm.get('menjars') as FormArray;
    this.menjars.push(this.initMenjar());
    this.cdRef.detectChanges();
  }

  initialItems(){
    this.menjars=this.encarrecForm.get('menjars') as FormArray;
    for(let i=0;i<this.data.encarrec.menjars.length;i++){

      //console.log(this.data.encarrec.menjars[i]);
      this.menjars.push(this.fb.group({
        menjar:this.data.encarrec.menjars[i],
        quantity:this.data.encarrec.quantity[i]
      },Validators.required))
    }


  }

  removeItem(i:number):void{
    if(i > 0){
      this.menjars.removeAt(i);
    }
  }

}
