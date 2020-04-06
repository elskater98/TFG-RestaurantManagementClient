import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = environment.urlConf;
  constructor(private http: HttpClient) { }

  getRoles(): Observable<any>{
    return this.http.get(this.url+'/getAllRoles')
  }

  getAllUsers():Observable<any>{
    return this.http.get(this.url+'/users');
  }

  getUsersByRole(role:string):Observable<any>{
    const options: any ={params:{key:'role',value:role}};
    return this.http.get(this.url+'getUsersByRole',options);

  }
}
