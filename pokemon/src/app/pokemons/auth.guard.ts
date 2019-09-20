import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";

import { CookieService } from "ngx-cookie-service";
import { PokemonService } from "./services/pokemon.service";
import { RefreshResponse } from "./models/refresh-response.model";
import { tap } from "rxjs/operators";
import { of } from "rxjs";
import { PCookieService } from "./p-cookie.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(
    private cookieService: PCookieService,
    private router: Router,
    private pokemonService: PokemonService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // We have a access token, we're logged in
    if (
      this.cookieService.checkAccessToken() ||
      this.cookieService.checkRefreshToken()
    ) {
      return true;
    }

    // Redirect to login
    this.router.navigate(["login"]);
    return false;
  }
}
