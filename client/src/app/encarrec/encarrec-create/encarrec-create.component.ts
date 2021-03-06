import {AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {Form, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {DatePipe} from '@angular/common';
import {MenjarService} from '../../services/menjar.service';
import {Utils} from '../../utils/utils';
import {environment} from '../../../environments/environment.prod';
import {EncarrecService} from '../../services/encarrec.service';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-encarrec-create',
  templateUrl: './encarrec-create.component.html',
  styleUrls: ['./encarrec-create.component.css']
})
export class EncarrecCreateComponent implements OnInit {

  encarrecForm:FormGroup;
  minDate:Date;
  menjars:FormArray;
  menjarsList:any;

  constructor(
    private fb: FormBuilder,
    private matSnackBar: MatSnackBar,
    private menjarService:MenjarService,
    private encarrecService:EncarrecService,
    private changeDetectorRef: ChangeDetectorRef,
    private datePipe: DatePipe,
    public dialogRef: MatDialogRef<EncarrecCreateComponent>,
    private cdRef:ChangeDetectorRef,
    public utils:Utils,
  private authenticationService:AuthenticationService,
  @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit() {
    this.minDate = new Date();
    this.getMenjars();

    this.encarrecForm = this.fb.group({
      client:new FormControl('', [Validators.required,Validators.maxLength(64), Validators.minLength(1)]),
      date:new FormControl(new Date().toISOString(),Validators.required),
      hour:new FormControl('13:00',Validators.required),
      mobile:new FormControl('',Validators.maxLength(32)),
      email:new FormControl('',Validators.email),
      observations:new FormControl('',Validators.maxLength(512)),
      takeaway:new FormControl(false),
      menjars:this.fb.array([this.initMenjar()])
    });


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
  },error => {
    this.matSnackBar.open(error['error']['error']+':'+error['status'],'Close',{
      duration:2000});
  });
  }

  createEncarrec(){
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

    this.encarrecService.registerEncarrec(encarrec).subscribe((data)=>{
      console.log(data);
    },(error)=>{
      this.matSnackBar.open(error['error']['error']+':'+error['status'],'Close',{
        duration:2000});
    });
    this.dialogRef.close();

  }

  initMenjar(){
    return this.fb.group({
      menjar:'',
      quantity:''
    },Validators.required)
  }

  addItem():void{
    this.menjars=this.encarrecForm.get('menjars') as FormArray;
    this.menjars.push(this.initMenjar());
    this.cdRef.detectChanges();
  }

  removeItem(i:number):void{
    if(i > 0){
      this.menjars.removeAt(i);
    }
  }

}
