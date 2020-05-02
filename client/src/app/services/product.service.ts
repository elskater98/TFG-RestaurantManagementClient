import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url = environment.urlConf;
  private currentUser = this.authenticationService.getCurrentUser();
  constructor(private http: HttpClient,private authenticationService: AuthenticationService) { }

  public getAllProducts():Observable<any>{
    return this.http.get(this.url+'/getProducts');
  }
}
