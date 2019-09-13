import { Component, OnInit } from '@angular/core';
import { Hero } from '../models/hero.model';
import { HEROES } from '../mock-heroes';

@Component({
  selector: 'sw-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[] = HEROES

  selectedHero: Hero

  constructor() { }

  ngOnInit() {
  }

  onSelect(hero: Hero) {
    console.log(hero)
    this.selectedHero = hero;
  }

}
