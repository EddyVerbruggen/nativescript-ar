import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { AR, ARCommonNode, ARMaterial, ARPlaneTappedEventData } from "nativescript-ar";
import { Color, Action, isIOS } from "@nativescript/core";
import { Pokemon } from "~/app/pokemon-data/pokemon";
import { PokemonDataService } from "~/app/pokemon-data/pokemon-data-service";
import { PokemonFavoritesService } from "~/app/pokemon-data/pokemon-favorites-service";

@Component({
    selector: "TryBeforeYouBuy",
    templateUrl: "./try-before-you-buy.component.html"
})
export class TryBeforeYouBuyComponent implements OnInit {

    pokemonList: Array<Pokemon> = [];
    currentPokemonNode: ARCommonNode;
    public planeMaterial = <ARMaterial>{
        diffuse: new Color("white")
    };

    constructor(private pokemonDataService: PokemonDataService,
                private pokemonFavoritesService: PokemonFavoritesService,
                private routerExtensions: RouterExtensions) {
    }

    ngOnInit(): void {
        this.pokemonDataService.getPokemonList()
            // only select Pokemon with a model
            .then(pokemonList => this.pokemonList = pokemonList.filter(p => p.model))
            .catch(e => console.error);
    }

    onBackButtonTap(): void {
        this.routerExtensions.back();
    }

    async planeTapped(args: ARPlaneTappedEventData) {
        const pokemon = await this.pokemonPicker();

        if (!pokemon) {
            return;
        }

        const ar: AR = args.object;

        // "There can be only one!".. or rather: we don't _want_ more than one model on screen in this demo ;)
        if (this.currentPokemonNode) {
            this.currentPokemonNode.remove();
        } else {
            // this is the first time the plane was tapped, so let's remove some debugging info/planes
            ar.togglePlaneVisibility(false);
            ar.setDebugLevel("NONE");
        }

        const name = isIOS
            ? `PokemonModels.scnassets/${pokemon.model.name}/${pokemon.model.name}.dae`
            : `${pokemon.model.name}.glb`;

        args.object.addModel({
            name,
            position: args.position,
            rotatingEnabled: true,
            draggingEnabled: true,
            scalingEnabled: true,
            scale: pokemon.model.scale / (isIOS ? 12 : 1)
        })
            .then(m => this.currentPokemonNode = m)
            .catch(console.error);
    }

    private async pokemonPicker(): Promise<Pokemon> {
        const options: Array<string> = [];
        this.pokemonList.map(p => options.push(p.name));
        const pickedItem: string = await Action("Pick a Pokémon", "Cancel", options);
        return this.pokemonList[options.indexOf(pickedItem)];
    }
}
