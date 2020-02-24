import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {environment} from '@env';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private baseUrl = environment.apiServers.ndfsmFleaMarket + '/api/notes';  // URL to web api

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get(this.baseUrl).pipe(
      tap(notes => this.log(`fetched notes`)),
      map((notes: any) => notes.data),
      catchError(this.handleError('getNotes', [])),
    );
  }

  save(note) {
    if (note.id) {
      return this.update(note);
    }
    return this.create(note);
  }

  create(note) {
    return this.http.post(this.baseUrl, note).pipe(
      tap(notes => this.log(`created note`)),
      map((res: any) => res.data),
      catchError(this.handleError('create', [])),
    );
  }

  update(note) {
    const id = note.id;
    note = Object.assign({}, note, {id: undefined});
    return this.http.put(this.baseUrl + '/' + id, note).pipe(
      map((res: any) => res.data),
      catchError(this.handleError('update', [])),
    );
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

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log('notes.service.ts::log >>>', message);
  }

}
