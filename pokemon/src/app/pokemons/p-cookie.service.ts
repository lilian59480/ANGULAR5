import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: "root"
})
export class PCookieService {
  constructor(private cookieService: CookieService) {}

  private accessfield = "access_token";
  private refreshfield = "refresh_token";

  checkAccessToken() {
    return this.cookieService.check(this.accessfield);
  }

  getAccessToken() {
    if (!this.checkAccessToken()) {
      return "";
    }
    return this.cookieService.get(this.accessfield);
  }

  setAccessToken(token: string, expiry: Date | number | undefined) {
    return this.cookieService.set(this.accessfield, token, expiry);
  }

  clearAccessToken() {
    return this.cookieService.delete(this.accessfield);
  }

  checkRefreshToken() {
    return this.cookieService.check(this.refreshfield);
  }

  getRefreshToken() {
    if (!this.checkAccessToken()) {
      return "";
    }
    return this.cookieService.get(this.refreshfield);
  }

  setRefreshToken(token: string, expiry: Date | number | undefined) {
    return this.cookieService.set(this.refreshfield, token, expiry);
  }

  clearRefreshToken() {
    return this.cookieService.delete(this.refreshfield);
  }
}
