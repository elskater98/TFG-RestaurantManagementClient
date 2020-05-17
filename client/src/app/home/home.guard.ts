import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticationService} from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {
  constructor(private authenticationService:AuthenticationService,
              private router: Router) {}

  canActivate(){
    if(!this.authenticationService.isLoggedIn()){
      this.router.navigate(['/login']);
    }else{
      if(this.authenticationService.isUserInRole("ADMIN")){
        this.router.navigate(['/employees']);
      }

      if(this.authenticationService.isUserInRole("CAMBRER")){
        this.router.navigate(['/reserve']);
      }

      if(this.authenticationService.isUserInRole("PROPIETARI")){
        this.router.navigate(['/products']);
      }
      if(this.authenticationService.isUserInRole("CUINER")){
        this.router.navigate(['/order']);
      }

      if(this.authenticationService.isUserInRole("BARTENDER")){
        this.router.navigate(['/reserve']);
      }
    }
    return true;
  }

}
