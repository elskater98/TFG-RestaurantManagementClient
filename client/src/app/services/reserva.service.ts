import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment.prod';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private url = environment.urlConf;
  private currentUser = this.authenticationService.getCurrentUser();
  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

  newBook(reserva:any):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: this.authenticationService.generateAuthorization(this.currentUser.username,this.currentUser.password)
      })
    };

    return this.http.post(this.url+'/reservas/',reserva,httpOptions);
  }

  findBySubIdAndInside(subId:string):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post(this.url+'/findBySubIdAndInside',JSON.stringify(subId),httpOptions);
  }

  findBySubIdAndOutside(subId:string):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post(this.url+'/findBySubIdAndOutside',JSON.stringify(subId),httpOptions);
  }

  delete(id:string):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: this.authenticationService.generateAuthorization(this.currentUser.username,this.currentUser.password)
      })
    };

    return this.http.delete(this.url+'/reservas/'+ id,httpOptions);
  }

  update(id:string, value:any):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: this.authenticationService.generateAuthorization(this.currentUser.username,this.currentUser.password)
      })
    };

    return this.http.patch(this.url+'/reservas/'+ id,value,httpOptions);
  }

  detail(id:string):Observable<any>{
    return this.http.get(this.url+'/reservas/'+id);
  }
}
