import { Component, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular";
import { Pokemon } from "~/app/pokemon-data/pokemon";
import { PokemonDataService } from "~/app/pokemon-data/pokemon-data-service";

@Component({
    selector: "PokemonSearchResult",
    templateUrl: "./pokemon-search-result.component.html",
    styleUrls: ["./pokemon-search-result.component.scss"]
})
export class PokemonSearchResultComponent implements OnDestroy {
    private queryParamsSubscription: any;
    pokemon: Pokemon;

    constructor(private route: ActivatedRoute,
                private routerExtensions: RouterExtensions,
                private pokemonDataService: PokemonDataService) {
        this.queryParamsSubscription = this.route
            .queryParams
            .subscribe(params => {
                pokemonDataService.getPokemonList()
                    .then(pokemonList => this.pokemon = pokemonList.filter(p => p.name === params["pokemonName"])[0])
            });
    }

    ngOnDestroy(): void {
        this.queryParamsSubscription.unsubscribe();
    }

    onBackButtonTap(): void {
        this.routerExtensions.back();
    }
}
