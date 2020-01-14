import {Injectable, Injector} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthService} from '@app/auth/services/auth.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
  private authService: AuthService;
  constructor(private injector: Injector) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.authService = this.injector.get(AuthService);
    const token: string = this.authService.getToken();
    if (!token) {
      return next.handle(request);
    }
    request = request.clone({
      setHeaders: {
        'x-access-token': token,
        'Content-Type': 'application/json'
      }
    });
    return next.handle(request);
  }
}
