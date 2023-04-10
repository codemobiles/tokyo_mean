import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import 'rxjs/add/operator/do';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let token = localStorage.getItem(environment.token);

    if (token != null) {
      // has token but not sure if valid
      const cloned = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });

      // simple way
      //return next.handle(cloned);
      // Intercept response too
      // npm i rxjs-compat
      return next.handle(cloned).do(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            // do stuff with response if you want
          }
        },
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (
              err.status === 401 ||
              err.status === 403 ||
              err.status === 500
            ) {
              localStorage.removeItem(environment.token);
              this.router.navigate(['login']);
            }
          }
        }
      );
    } else {
      // no token
      return next.handle(req).do(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            // do stuff with response if you want
          }
        },
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (
              err.status === 401 ||
              err.status === 403 ||
              err.status === 500
            ) {
              localStorage.removeItem(environment.token);
              this.router.navigate(['login']);
            }
          }
        }
      );
    }
  }
}
