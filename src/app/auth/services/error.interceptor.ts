import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError} from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(/*private authenticationService: AuthenticationService*/) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      console.log('error.interceptor.ts::::13 >>>', request.url, err);
      if (err.status === 401) {
        // auto logout if 401 response returned from api
        // this.authenticationService.logout();
        // location.reload(true);
      }

      const error = err.error.message || err.statusText;
      return throwError(error);
    }));
  }
}
