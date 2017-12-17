import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators/tap';
import { catchError } from 'rxjs/operators/catchError';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';

@Injectable()
export class TodosService {


  private baseUrl = 'api/todos';

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get(this.baseUrl)
      .pipe(
        tap(next => this.log(`fetched todos`)),
        map((res: any) => res.data),
        catchError(this.handleError('list', []))
    );
  }

  save() {

  }

  create(id, data) {

  }

  update(data) {

  }

  remove() {

  }


  private handleError<T> (operation = 'operation', result?: T) {
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
