import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { RouterExtensions } from "nativescript-angular";
import { ARTrackingImageDetectedEventData } from "nativescript-ar";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { isIOS } from "tns-core-modules/platform";
import { View } from "tns-core-modules/ui/core/view";
import { Pokemon } from "~/app/pokemon-data/pokemon";
import { PokemonDataService } from "~/app/pokemon-data/pokemon-data-service";
import { PokemonFavoritesService } from "~/app/pokemon-data/pokemon-favorites-service";

const DEFAULT_SCAN_HINT = "Scan a Pokémon card";

@Component({
    selector: "SearchByCard",
    templateUrl: "./search-by-card.component.html",
    styleUrls: ["./search-by-card.component.scss"]
})
export class SearchByCardComponent implements OnInit {

    pokemonList: Array<Pokemon> = [];
    arScannerActivated = false;
    scanHint = DEFAULT_SCAN_HINT;

    @ViewChild("arPoweredScanner", {static: false}) arPoweredScanner: ElementRef;

    constructor(private pokemonDataService: PokemonDataService,
                private pokemonFavoritesService: PokemonFavoritesService,
                private routerExtensions: RouterExtensions) {
    }

    ngOnInit(): void {
        this.pokemonDataService.getPokemonList()
            .then(pokemonList => this.pokemonList = pokemonList)
            .catch(e => console.error);
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    onBackButtonTap(): void {
        this.routerExtensions.back();
    }

    toggleAR(): void {
        const view: View = this.arPoweredScanner.nativeElement;

        this.arScannerActivated = !this.arScannerActivated;

        view.animate({
            height: this.arScannerActivated ? 300 : 0,
            opacity: this.arScannerActivated ? 1 : 0,
            duration: 400,
            delay: 100,
            curve: "easeInOut"
        }).catch(e => console.error);
    }

    itemTapped(pokemonName: string): void {
        console.log("item tapped: " + pokemonName);
        this.goToDetailPage(pokemonName);
    }

    async trackingImageDetected(args: ARTrackingImageDetectedEventData) {
        console.log(`Image found: ${args.imageName}`);

        const pokemon = await this.pokemonDataService.getPokemonList()
            .then(pokemonList => {
                const filtered = pokemonList.filter(p => p.name === args.imageName);
                return filtered.length > 0 ? filtered[0] : null;
            });

        if (!pokemon) {
            return;
        }

        this.scanHint = `Pokémon found: ${args.imageName}`;

        // this works, but it's quite useless
        args.imageTrackingActions.addImage({
            image: `~/app/images/ScanPlaceholder.png`,
            position: {
                x: 0,
                y: 0,
                z: 0.03
            },
            scale: isIOS ? 3.45 : 0.7 // TODO this is currently device-dependent
        });

        // added a few delays for smoother transitions
        setTimeout(() => {
            this.toggleAR();
            setTimeout(() => {
                this.goToDetailPage(args.imageName);
                this.scanHint = DEFAULT_SCAN_HINT;
            }, 800);
        }, 2000);
    }

    toggleFavorite(pokemon: Pokemon): void {
        this.pokemonFavoritesService.toggleFavorite(pokemon);
    }

    private goToDetailPage(forPokemon: string): void {
        this.routerExtensions.navigate(["/search/pokemon"], {
            animated: true,
            clearHistory: false,
            queryParams: {
                pokemonName: forPokemon
            }
        });

    }
}
