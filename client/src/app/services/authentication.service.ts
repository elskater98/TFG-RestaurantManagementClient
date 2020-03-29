import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../authentication/User';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment.prod';

@Injectable()
export class AuthenticationService {
  private url = environment.urlConf;

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string): Observable<User> {
    const authorization = this.generateAuthorization(username, password);
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: authorization
      })
    };
    return this.http.get(this.url + '/identity', httpOptions).pipe(
      map(data => {
        const user: User = new User(data);
        user.authorization = authorization;
        user.password = password;
        return user;
      })
    );
  }

  register(user: User): Observable<any> {
    return this.http.post(this.url + '/register',user);
  }

  generateAuthorization(username: string, password: string): string {
    return `Basic ${btoa(`${username}:${password}`)}`;
  }

  storeCurrentUser(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('currentUser') !== null;
  }

  getCurrentUser(): User {
    return new User(JSON.parse(localStorage.getItem('currentUser')));
  }

  isUserInRole(role: string): boolean {
    const user: User = this.getCurrentUser();
    return user && user.authorities[0] &&
      user.authorities[0].authority === 'ROLE_' + role.toUpperCase();
  }
}
