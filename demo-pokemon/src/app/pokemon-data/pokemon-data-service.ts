import { Injectable } from "@angular/core";
import { knownFolders } from "@nativescript/core";
import { PokemonFavoritesService } from "~/app/pokemon-data/pokemon-favorites-service";
import { Pokemon } from "./pokemon";

@Injectable()
export class PokemonDataService {
    public pokemonList: Array<Pokemon>;

    constructor(private pokemonFavoritesService: PokemonFavoritesService) {
    }

    getPokemonList(): Promise<Array<Pokemon>> {
        const file = knownFolders.currentApp().getFile("app/pokemon-data/pokemon.json");

        if (this.pokemonList) {
            return Promise.resolve(this.pokemonList);
        }

        return new Promise((resolve, reject) => {
            file.readText()
                .then(content => {
                    this.pokemonList = JSON.parse(content);
                    // sort A-Z
                    this.pokemonList.sort((a, b) => a.name > b.name ? 1 : -1);
                    // capitalize
                    this.pokemonList.map(p => p.name = p.name.substring(0, 1).toUpperCase() + p.name.substring(1));
                    // set favorites
                    this.pokemonFavoritesService.mergeFavorites(this.pokemonList);
                    resolve(this.pokemonList);
                })
                .catch(err => reject(err));
        });
    }
}
