import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable()
export class NotesService {

  private baseUrl = 'api/notes';  // URL to web api

  constructor(private http: HttpClient) {}

  getNotes() {
    return this.http.get(this.baseUrl)
    .pipe(
      tap(notes => this.log(`fetched notes`)),
      map((notes: any) => notes.data),
      catchError(this.handleError('getNotes', []))
    );
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

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log('notes.service.ts::log >>>', message);
  }

}
