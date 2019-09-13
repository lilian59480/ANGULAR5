import { Component, OnInit } from '@angular/core';
import { Hero } from '../models/hero.model';


@Component({
  selector: 'sw-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  hero: Hero = {
    id: 1,
    name: "Jar Jar Binks"
  }

  constructor() { }

  ngOnInit() {
  }

}
