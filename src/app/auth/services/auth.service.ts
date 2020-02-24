import {Injectable} from '@angular/core';
import {Authenticate, User, UserTokenResponse} from '../models/user';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '@env';
import {map, tap} from 'rxjs/operators';
import { LoggerService } from '@app/core/logger.service'

@Injectable()
export class AuthService {

  private baseUrl = environment.apiServers.auth;

  constructor(private httpClient: HttpClient, private logger: LoggerService) {}

  login({username, password}: Authenticate): Observable<UserTokenResponse> {
    return this.httpClient.post(this.baseUrl + '/token', {username, password}).pipe(
      tap((next: UserTokenResponse) => this.log(`login...`))
      /*map((res: any) => res)*/, /*
      catchError(this.handleError('login', {success: false}))*/
    );
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  me(): Observable<User> {
    return this.httpClient.get(this.baseUrl + '/info', {}).pipe(
      tap((next: User) => this.log(`me...`,)),
    );
  }

  logout() {
    return of(true);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(...args) {
    this.logger.log('[AUTH SERVICE]', ...args);
  }
}
