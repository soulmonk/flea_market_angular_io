import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {environment} from '@env';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private baseUrl = environment.apiServer + 'api/todo';

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get(this.baseUrl).pipe(
      tap(next => this.log(`fetched todos`)),
      map((res: any) => res.data),
      catchError(this.handleError('list', []))
    );
  }

  save() {

  }

  create(data) {
    return this.httpClient.post(this.baseUrl, data).pipe(
      tap(next => this.log(`add todo`)),
      map((res: any) => res.data),
      catchError(this.handleError('add', []))
    );

  }

  update(id, data) {

  }

  remove() {

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
