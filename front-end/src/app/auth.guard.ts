import { LoginService } from "./services/login.service";
import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private loggedInService: LoginService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    let url: string = state.url;
    // return this.loggedInService.isLoggedIn$;
    if (sessionStorage.getItem("res-session")) {
      return true;
    } else if (sessionStorage.getItem("res-session") == undefined) return false;
  }

  checkLogin(url: string): Observable<boolean> {
    /* if (this.loggedInService.isLoggedIn) {
      return true;
    } else {
      this.loggedInService.redirectUrl = url;
      return false;
    } */
    // return this.loggedInService.isLoggedIn$;
    // return true;
    if (sessionStorage.getItem("res-session")) {
      return true;
    } else if (sessionStorage.getItem("res-session") == undefined) return false;
  }
}
