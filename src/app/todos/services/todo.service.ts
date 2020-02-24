import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {environment} from '@env';
import { LoggerService } from '@app/core/logger.service'

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private baseUrl = environment.apiServers.ndfsmFleaMarket + '/api/todo';

  constructor(private httpClient: HttpClient, private logger: LoggerService) { }

  list() {
    return this.httpClient.get(this.baseUrl).pipe(
      tap(next => this.log(`fetched todos`)),
      map((res: any) => res.data),
      catchError(this.handleError('list', []))
    );
  }

  create(data) {
    return this.httpClient.post(this.baseUrl, data).pipe(
      tap(next => this.log(`add todo`)),
      map((res: any) => res.data),
      catchError(this.handleError('add', []))
    );
  }

  update(id, data) {
    return this.httpClient.put(`${this.baseUrl}/${id}`, data).pipe(
      tap(next => this.log(`update todo`)),
      map((res: any) => res.data),
      catchError(this.handleError('update', []))
    );
  }

  remove(id) {
    return this.httpClient.delete(`${this.baseUrl}/${id}`).pipe(
      tap(next => this.log(`remove todo`)),
      map((res: any) => res.data),
      catchError(this.handleError('remove', []))
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

  private log(...args) {
    this.logger.log('[TODO-SERVICE]', ...args)
  }
}
