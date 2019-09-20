import { Component, OnInit } from "@angular/core";
import { PokemonService } from "../services/pokemon.service";
import { LoginResponse } from "../models/login-response.model";
import { CookieService } from "ngx-cookie-service";
import { Router } from "@angular/router";
import { PCookieService } from "../p-cookie.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  constructor(
    private pokemonService: PokemonService,
    private cookieService: PCookieService,
    private router: Router
  ) {}

  ngOnInit() {}

  login(email: string, password: string) {
    if (email.length == 0) {
      // Handle errors later
      return;
    }

    if (password.length == 0) {
      // Handle errors later
      return;
    }

    this.pokemonService
      .login(email, password)
      .subscribe((result: LoginResponse) => {
        console.log(result);

        if (!result) {
          return;
        }

        const expiry_access = new Date();
        expiry_access.setSeconds(
          expiry_access.getSeconds() + parseInt(result.expires_in, 10)
        );

        this.cookieService.setAccessToken(result.access_token, expiry_access);
        this.cookieService.setRefreshToken(result.refresh_token, 7);

        this.router.navigate(["team"]);
      });
  }
}
