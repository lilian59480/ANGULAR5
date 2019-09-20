import { Component, OnInit } from "@angular/core";
import { PCookieService } from "../p-cookie.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  constructor(private cookieService: PCookieService) {}

  isLogged: boolean = false;

  ngOnInit() {
    this.isLogged =
      this.cookieService.checkAccessToken() ||
      this.cookieService.checkRefreshToken();
  }
}
