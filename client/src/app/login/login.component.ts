import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error:boolean;

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthenticationService ) { }

  ngOnInit() {
    this.error=false;
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login(){
    this.authService.login(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe(user =>{
        this.authService.storeCurrentUser(user);
        console.log(user.id + "successfully logged in");
        this.router.navigate(['']);
      },()=> this.error=true)
  }

}
