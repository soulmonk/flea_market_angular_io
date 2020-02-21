import {Injectable} from '@angular/core';
import {Authenticate, User, UserAuthResponse} from '../models/user';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '@env';
import {map, tap} from 'rxjs/operators';

@Injectable()
export class AuthService {

  private baseUrl = environment.apiServer + 'api/auth';

  constructor(private httpClient: HttpClient) {}

  login({username, password}: Authenticate): Observable<UserAuthResponse> {
    return this.httpClient.post(this.baseUrl + '/login', {username, password}).pipe(
      tap(next => this.log(`login...`)),
      map((res: any) => res.data), /*
      catchError(this.handleError('login', {success: false}))*/
    );
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  me(): Observable<UserAuthResponse> {
    return this.httpClient.get(this.baseUrl + '/validate', {}).pipe(
      tap(next => this.log(`me...`,)),
      map((res: any) => res.data),
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

  private log(message: string) {
    console.log('todos.service.ts::log >>>', message);
  }
}
