import { Component } from "@angular/core";
import { RouterExtensions } from "nativescript-angular";
import { ARCommonNode, ARTrackingImageDetectedEventData } from "nativescript-ar";
import { isIOS } from "tns-core-modules/platform";
import { PokemonDataService } from "~/app/pokemon-data/pokemon-data-service";
import { PokemonFavoritesService } from "~/app/pokemon-data/pokemon-favorites-service";

@Component({
    selector: "AugmentCard",
    templateUrl: "./augment-card.component.html"
})
export class AugmentCardComponent {
    constructor(private pokemonDataService: PokemonDataService,
                private pokemonFavoritesService: PokemonFavoritesService,
                private routerExtensions: RouterExtensions) {
    }

    onBackButtonTap(): void {
        this.routerExtensions.back();
    }

    async trackingImageDetected(args: ARTrackingImageDetectedEventData) {

        const pokemon = await this.pokemonDataService.getPokemonList()
            .then(pokemonList => {
                const filtered = pokemonList.filter(p => p.name === args.imageName);
                return filtered.length > 0 ? filtered[0] : null;
            });

        console.log(">> tracking image for pokemon: " + pokemon);

        // note that this is not implemented currently on Android
        args.imageTrackingActions.playVideo("https://pokemonletsgo.pokemon.com/assets/video/go-park-video.mp4", true);

        // we could use this to stop looping the video after 5 seconds
        // setTimeout(() => args.imageTrackingActions.stopVideoLoop(), 5000);

        if (!pokemon) {
            return;
        }

        if (pokemon.model) {
            let interval: number;

            const name = isIOS
                ? 'PokemonModels.scnassets/' + pokemon.model.ios.name
                : pokemon.model.android.name;

            args.imageTrackingActions.addModel({
                name,
                scale: isIOS ? pokemon.model.ios.scale : pokemon.model.android.scale,
                position: {
                    x: 0,
                    y: isIOS ? 2 : 0.1, // TODO currently Android rotation is off; setting y actually applies z (so toward the camera instead of upwards)
                    z: 0
                },
                onTap: nodeInteraction => {
                    // tap = start rotating, tap again = stop rotating
                    console.log("interval: " + interval);
                    if (interval) {
                        clearInterval(interval);
                        interval = undefined;
                    } else {
                        const fps = 60;
                        const rotateDegreesPerSecond = 60;
                        interval = setInterval(() => {
                            nodeInteraction.node.rotateBy({x: 0, y: rotateDegreesPerSecond / fps, z: 0});
                        }, 1000 / fps);
                    }
                }
            });
        }

        let favNode: ARCommonNode;
        let imgNode: ARCommonNode;

        const addFavoriteImage = () => {
            args.imageTrackingActions.addImage({
                image: `~/app/images/favorite-${pokemon.favorite ? 'on' : 'off'}.png`,
                dimensions: {
                    x: isIOS ? 3 : 0.01,
                    y: isIOS ? 3 : 0.01
                },
                position: {
                    x: isIOS ? 3.5 : 0,
                    y: isIOS ? -1.6 : 0,
                    z: 0
                },
                scale: isIOS ? 1 : 0.2,
                onTap: toggleFavorite
            }).then(node => favNode = node);
        };

        const addPokemonImage = () => {
            args.imageTrackingActions.addImage({
                image: pokemon.sprite,
                dimensions: {
                    x: isIOS ? 2.5 : 1,
                    y: isIOS ? 2.5 : 1
                },
                position: {
                    x: isIOS ? 3.5 : 0,
                    y: isIOS ? -1.6 : 0,
                    z: isIOS ? 0.07 : 0
                },
                scale: isIOS ? 1 : 0.2,
                onTap: toggleFavorite
            }).then(node => imgNode = node);
        };

        const toggleFavorite = () => {
            this.pokemonFavoritesService.toggleFavorite(pokemon);
            favNode.remove();
            addFavoriteImage();
            if (pokemon.favorite) {
                addPokemonImage();
            } else {
                imgNode.remove();
            }
        };

        addFavoriteImage();

        if (pokemon.favorite) {
            addPokemonImage();
        }
    }
}
