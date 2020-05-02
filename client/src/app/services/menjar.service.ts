import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment.prod';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenjarService {

  private url = environment.urlConf;
  private currentUser = this.authenticationService.getCurrentUser();
  constructor(private http: HttpClient,private authenticationService: AuthenticationService) { }

  public getAllMenjars():Observable<any>{
    return this.http.get(this.url+'/getMenjars');
  }

  public edit(id,menjar):Observable<any>{

      const httpOptions = {
        headers: new HttpHeaders({
          Authorization: this.authenticationService.generateAuthorization(this.currentUser.username,this.currentUser.password),
          'Content-Type': 'application/json'
        })
      };

    return this.http.patch(this.url+'/menjars/'+id,menjar,httpOptions);
  }

}
