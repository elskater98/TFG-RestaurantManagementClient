import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticationService} from './services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(private authenticationService:AuthenticationService,
              private router: Router) {}
  canActivate(){
    if(!this.authenticationService.isLoggedIn()){
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }

}
