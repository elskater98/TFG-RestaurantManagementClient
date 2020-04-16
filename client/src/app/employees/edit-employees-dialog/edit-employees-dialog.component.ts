import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-edit-employees-dialog',
  templateUrl: './edit-employees-dialog.component.html',

})
export class EditEmployeesDialogComponent implements OnInit {
  editForm: FormGroup;
  roles:string[]=[];
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private matSnackBar: MatSnackBar,
    private authService: AuthenticationService,
    public dialogRef: MatDialogRef<EditEmployeesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit() {
    this.getRoles();
    this.editForm = this.formBuilder.group({
      email: new FormControl(this.data.email, [Validators.required,Validators.email]),
      name: new FormControl(this.data.name, [Validators.required,Validators.max(128)]),
      surname: new FormControl(this.data.surname, [Validators.required,Validators.max(128)]),
      role: new FormControl(this.data.role, Validators.required),
    })
  }

  submit() {
    if(this.authService.isLoggedIn() && (this.authService.isUserInRole('Admin')
      ||this.authService.isUserInRole('Propietari'))){

      this.userService.editUser(this.data.username,this.editForm.value).subscribe(() => {
        console.log(this.data.username+" has been update successfully.");
        this.dialogRef.close();

      },error => {
        this.matSnackBar.open('Update '+this.data.username+' failed.','Close',{
          duration:2000});
      });
    }else{
      this.matSnackBar.open('Unauthorized','Close',{
        duration:2000});
    }

  }

  getRoles(){
    this.userService.getRoles().subscribe(
      (roleList: string[]) => {
        this.roles=roleList;
      });
  }

}
