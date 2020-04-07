import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-delete-employe-dialog',
  templateUrl: './delete-employe-dialog.component.html',
})
export class DeleteEmployeDialogComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthenticationService,
    private matSnackBar: MatSnackBar,
    private dialogRef: MatDialogRef<DeleteEmployeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) {}

  ngOnInit() {
  }

  delete(){
    let username=this.data.username;

    if(this.authService.isLoggedIn() && (this.authService.isUserInRole('Admin')
      ||this.authService.isUserInRole('Propietari'))){
      this.userService.deleteUser(username).subscribe(res=>{
        console.log(username+" has been deleted successfully.");
        this.dialogRef.close();
      },error => {
        this.matSnackBar.open('Delete '+username+' failed.','Close',{
          duration:2000});
      });
    }else{
      this.matSnackBar.open('Unauthorized','Close',{
        duration:2000});
    }
  }

}
