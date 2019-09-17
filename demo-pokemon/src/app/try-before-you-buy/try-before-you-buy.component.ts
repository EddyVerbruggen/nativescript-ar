import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular";
import { ARCommonNode, ARNodeInteraction, ARPlaneTappedEventData } from "nativescript-ar";
import { isIOS } from "tns-core-modules/platform";
import { action } from "tns-core-modules/ui/dialogs";
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

        // "There can be only one!".. or rather: we don't _want_ more than one model on screen in this demo ;)
        if (this.currentPokemonNode) {
            this.currentPokemonNode.remove();
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
            scale: pokemon.model.scale / (isIOS ? 15 : 0.8),
            onLongPress: (interaction: ARNodeInteraction) => interaction.node.remove()
        })
            .then(m => this.currentPokemonNode = m)
            .catch(console.error);
    }

    private async pokemonPicker(): Promise<Pokemon> {
        const options: Array<string> = [];
        this.pokemonList.map(p => options.push(p.name));
        const pickedItem: string = await action("Pick a Pokémon", "Cancel", options);
        return this.pokemonList[options.indexOf(pickedItem)];
    }
}
