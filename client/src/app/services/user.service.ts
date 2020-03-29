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
}
