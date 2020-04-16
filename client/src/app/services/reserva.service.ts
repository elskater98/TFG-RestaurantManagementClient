import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment.prod';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';
import {Observable} from 'rxjs';
import {Reserva} from '../../models/Reserva';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private url = environment.urlConf;
  private currentUser = this.authenticationService.getCurrentUser();
  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

  newBook(reserva:Reserva):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: this.authenticationService.generateAuthorization(this.currentUser.username,this.currentUser.password)
      })
    };

    return this.http.post(this.url+'/reservas/'+ reserva,httpOptions);
  }

}
