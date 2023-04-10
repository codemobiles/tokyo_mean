import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenGuard implements CanActivate {
  constructor(private router: Router, private rest: RestService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.rest.isLoggedIn) {
      // already logged-in
      if (state.url == '/login') {
        this.router.navigate(['stock']);
      }
      return true;
    } else {
      // not yet logged-in
      if (state.url != '/login') {
        this.router.navigate(['login']);
      }
      return true;
    }
  }
}
