import {Injectable} from '@angular/core';
import {Authenticate, User, UserTokenResponse} from '../models/user';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '@env';
import {tap} from 'rxjs/operators';
import {LoggerService} from '@app/core/logger.service';

@Injectable()
export class AuthService {

  private baseUrl = environment.apiServers.auth;

  private token: string = null;

  constructor(private httpClient: HttpClient, private logger: LoggerService) {
  }

  login({username, password}: Authenticate): Observable<UserTokenResponse> {
    return this.httpClient.post(this.baseUrl + '/token',
      {username, password},
      {withCredentials: true}).pipe(
      tap((next: UserTokenResponse) => this.log(`login...`)),
    );
  }

  refreshToken() {
    return this.httpClient.post(this.baseUrl + '/refresh-token', {},
      {withCredentials: true}).pipe(
      tap((next: UserTokenResponse) => this.log(`refreshToken...`))
    );
  }

  logout() {
    return this.httpClient.post(this.baseUrl + '/logout', {},
      {withCredentials: true}).pipe(
      tap(() => this.log(`logout...`))
    );
  }

  setToken(token) {
    this.token = token;
  }

  getToken(): string {
    return this.token;
  }

  me(): Observable<User> {
    return this.httpClient.get(this.baseUrl + '/info', {}).pipe(
      tap((next: User) => this.log(`me...`)),
    );
  }

  private log(...args) {
    this.logger.log('[AUTH SERVICE]', ...args);
  }
}
