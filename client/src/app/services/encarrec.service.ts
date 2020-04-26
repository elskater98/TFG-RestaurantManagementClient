import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment.prod';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EncarrecService {
  private url = environment.urlConf;
  constructor(private http: HttpClient,private authenticationService: AuthenticationService) { }
  private currentUser = this.authenticationService.getCurrentUser();

  registerEncarrec(encarrec:any):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: this.authenticationService.generateAuthorization(this.currentUser.username,this.currentUser.password)
      })
    };
   return this.http.post(this.url+'/encarrecs',encarrec,httpOptions);
  }

  getAll():Observable<any>{
    return this.http.get(this.url+'/encarrecs');
  }

  delete(id:string):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: this.authenticationService.generateAuthorization(this.currentUser.username,this.currentUser.password)
      })
    };
    return this.http.delete(this.url+'/encarrecs/'+id,httpOptions);
  }

  edit(id:string,encarrec:any):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: this.authenticationService.generateAuthorization(this.currentUser.username,this.currentUser.password)
      })
    };
    return this.http.patch(this.url+'/encarrecs/'+id,encarrec,httpOptions);
  }
}
