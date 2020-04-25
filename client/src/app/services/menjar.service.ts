import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenjarService {

  private url = environment.urlConf;
  constructor(private http: HttpClient) { }

  public getAllMenjars():Observable<any>{
    return this.http.get(this.url+'/menjars');
  }
}
