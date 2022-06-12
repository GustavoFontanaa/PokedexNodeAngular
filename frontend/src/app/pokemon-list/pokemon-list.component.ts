import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
})
export class PokemonListComponent implements OnInit {
  pokemons: any[] = [];
  page = 1;
  totalPokemons: any;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.getPokemons();
  }

  // Pegar Pokemon
  getPokemons() {
    this.dataService
      .getPokemons()
      .subscribe((response: any) => {
        this.totalPokemons = response.count;
        response.results.forEach((result: any) => {
          this.dataService
            .getMoreData(result.name)
            .subscribe((uniqResponse: any) => {
              this.pokemons.push(uniqResponse);
              console.log(this.pokemons);
            });
        });
      });
  }
}
