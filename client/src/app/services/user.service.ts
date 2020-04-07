import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment.prod';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../authentication/User';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = environment.urlConf;
  private currentUser = this.authenticationService.getCurrentUser();
  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

  getRoles(): Observable<any>{
    return this.http.get(this.url+'/getAllRoles')
  }

  getAllUsers():Observable<any>{
    return this.http.get(this.url+'/users');
  }

  getUsersByRole(role:string):Observable<any>{
    const options: any ={params:{key:'role',value:role}};
    return this.http.get(this.url+'/getUsersByRole',options);

  }
  deleteUser(username:string):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: this.authenticationService.generateAuthorization(this.currentUser.username,this.currentUser.password)
      })
    };

    return this.http.delete(this.url+'/users/'+ username,httpOptions);
  }
  editUser(username:string,values:any):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: this.authenticationService.generateAuthorization(this.currentUser.username,this.currentUser.password)
      })
    };

    return this.http.patch(this.url+'/users/'+ username,values,httpOptions);
  }
}
