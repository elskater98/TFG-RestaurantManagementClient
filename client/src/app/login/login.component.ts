import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error:boolean;

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthenticationService,
              private matSnackBar: MatSnackBar) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  login(){
    this.authService.login(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe(user =>{
        this.authService.storeCurrentUser(user);
        console.log(user.id + "successfully logged in");
        this.error=false;
        this.router.navigate(['']).then(()=>{
          window.location.reload();
        });
      },()=> this.matSnackBar.open('Username or password incorrect.','Close',{
        duration:2000,
      }))
  }

}
