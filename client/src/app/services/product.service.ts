import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment.prod';
import {HttpClient, HttpHeaders} from '@angular/common/http';
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

  public getToBuy():Observable<any>{
    return this.http.get(this.url+'/getProducts');
  }
  public getBlackList():Observable<any>{
    return this.http.get(this.url+'/getProducts');
  }

  public createProduct(product):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: this.authenticationService.generateAuthorization(this.currentUser.username,this.currentUser.password),
        'Content-Type': 'application/json'
      })
    };

    return this.http.post(this.url+'/productes',product,httpOptions);
  }

  public editProduct(id,product):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: this.authenticationService.generateAuthorization(this.currentUser.username,this.currentUser.password),
        'Content-Type': 'application/json'
      })
    };
    return this.http.patch(this.url+'/productes/'+id,product,httpOptions);
  }

  public deleteProduct(id):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: this.authenticationService.generateAuthorization(this.currentUser.username,this.currentUser.password),
        'Content-Type': 'application/json'
      })
    };
    return this.http.delete(this.url+'/productes/'+id,httpOptions);
  }

}
