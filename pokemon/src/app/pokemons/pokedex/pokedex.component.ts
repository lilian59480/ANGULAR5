import { Component, OnInit, Input } from "@angular/core";


@Component({
  selector: "app-pokedex",
  templateUrl: "./pokedex.component.html",
  styleUrls: ["./pokedex.component.scss"]
})
export class PokedexComponent implements OnInit {

  selectedId: number = 1

  constructor() {}

  ngOnInit() {}

  setDetail($event: number) {
    this.selectedId = $event;
  }
}
