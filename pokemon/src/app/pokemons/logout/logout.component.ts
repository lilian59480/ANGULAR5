import { Component, OnInit } from "@angular/core";
import { PCookieService } from "../p-cookie.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-logout",
  templateUrl: "./logout.component.html",
  styleUrls: ["./logout.component.scss"]
})
export class LogoutComponent implements OnInit {
  constructor(private router: Router, private cookieService: PCookieService) {}

  ngOnInit() {
    this.cookieService.clearAccessToken();
    this.cookieService.clearRefreshToken();

    this.router.navigate([""]);
  }
}
