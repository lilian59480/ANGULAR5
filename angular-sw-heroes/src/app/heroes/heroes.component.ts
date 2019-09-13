import { Component, OnInit } from '@angular/core';
import { Hero } from '../models/hero.model';
import { HeroService } from '../services/hero.service';

@Component({
  selector: 'sw-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[]

  // selectedHero: Hero

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.heroService.getHeroes().subscribe(
      (result: Hero[]) => {
        this.heroes = result;
      }
    )
  }

  // onSelect(hero: Hero) {
  //   console.log(hero)
  //   this.selectedHero = hero;
  // }

}
