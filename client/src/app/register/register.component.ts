import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {MatSnackBar} from '@angular/material';
import {UserService} from '../services/user.service';
import {User} from '../authentication/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  registerForm:FormGroup;
  roles:string[];

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthenticationService,
              private matSnackBar: MatSnackBar,
              private userService: UserService) { }

  ngOnInit() {
  this.getRoles();

    this.registerForm = this.fb.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required,Validators.max(256),Validators.min(4)]),
      email: new FormControl('', [Validators.required,Validators.email]),
      name: new FormControl('', [Validators.required,Validators.max(128)]),
      surname: new FormControl('', [Validators.required,Validators.max(128)]),
      role: new FormControl('', Validators.required),
    });
  }

  register(){
    let user = new User();

    user.username=this.registerForm.value.username;
    user.password = this.registerForm.value.password;
    user.email = this.registerForm.value.email;
    user.name = this.registerForm.value.name;
    user.surname = this.registerForm.value.surname;
    user.role = this.registerForm.value.role;

    this.authService.register(user).subscribe(data=>{
      this.router.navigate(['login']);
    },()=>{
      this.matSnackBar.open('Register error','Close',{
      duration:2000});
    })
  }

  getRoles(){
    this.userService.getRoles().subscribe(
      (roleList: string[]) => {
        this.roles=roleList;
      });
  }
}
