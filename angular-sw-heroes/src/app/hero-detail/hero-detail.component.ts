import { Component, OnInit, Input } from "@angular/core";
import { Hero } from "../models/hero.model";
import { HeroService } from '../services/hero.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: "sw-hero-detail",
  templateUrl: "./hero-detail.component.html",
  styleUrls: ["./hero-detail.component.scss"]
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;

  id: number

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get("id"))
    this.getHero();
  }

  getHero() {
    this.heroService.getHero(this.id).subscribe((result: Hero) => {
      this.hero = result
    })
  }

  goBack() {
    this.location.back()
  }

  save() {
    this.heroService.updateHero(this.hero).subscribe(
      () => {
        this.goBack()
      }
    )
  }
}
