import { Component, OnInit } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Hero } from "../models/hero.model";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";
import { HeroService } from '../services/hero.service';

@Component({
  selector: "sw-hero-search",
  templateUrl: "./hero-search.component.html",
  styleUrls: ["./hero-search.component.scss"]
})
export class HeroSearchComponent implements OnInit {
  heroes$: Observable<Hero[]>;

  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) {}

  ngOnInit() {
    this.heroes$ = this.searchTerms
      .pipe(debounceTime(300))
      .pipe(distinctUntilChanged())
      .pipe(switchMap((term: string) => this.heroService.searchHeroes(term)));
  }

  search(term: string) {
    this.searchTerms.next(term);
  }
}
