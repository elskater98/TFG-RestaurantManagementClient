import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  currentUser:any;

  constructor(private authService: AuthenticationService ) { }

  ngOnInit() {
    this.currentUser=this.authService.getCurrentUser();
  }

  logout(){
    this.authService.logout();
    this.currentUser=this.authService.getCurrentUser();
  }

}
