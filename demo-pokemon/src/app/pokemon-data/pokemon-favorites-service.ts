import { Injectable } from "@angular/core";
import * as ApplicationSettings from "tns-core-modules/application-settings";
import { Pokemon } from "./pokemon";

const FAVORITES_KEY = "FAVORITES";

@Injectable()
export class PokemonFavoritesService {
    favorites: Array<string>;

    mergeFavorites(pokemonList: Array<Pokemon>) {
        // any Pokemon names in this list have been favorited by the user
        this.favorites = JSON.parse(ApplicationSettings.getString(FAVORITES_KEY, JSON.stringify([])));
        this.favorites.forEach(fav => {
            pokemonList.filter(p => p.name === fav)[0].favorite = true;
        });
    }

    toggleFavorite(pokemon: Pokemon): void {
        pokemon.favorite = !pokemon.favorite;
        if (pokemon.favorite) {
            this.favorites.push(pokemon.name);
        } else {
            this.favorites.splice(this.favorites.indexOf(pokemon.name), 1);
        }
        this.storeFavorites();
    }

    private storeFavorites(): void {
        ApplicationSettings.setString(FAVORITES_KEY, JSON.stringify(this.favorites));
    }
}
