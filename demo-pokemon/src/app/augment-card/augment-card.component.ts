import { Component } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { ARCommonNode, ARTrackingImageDetectedEventData } from "nativescript-ar";
import { isIOS } from "@nativescript/core";
import { PokemonDataService } from "../../app/pokemon-data/pokemon-data-service";
import { PokemonFavoritesService } from "../../app/pokemon-data/pokemon-favorites-service";

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
        // some images are named 'Eevee2.jpg', so let's just remove the number ;)
        args.imageName = args.imageName.replace("2", "");

        const pokemon = await this.pokemonDataService.getPokemonList()
            .then(pokemonList => {
                const filtered = pokemonList.filter(p => p.name === args.imageName);
                return filtered.length > 0 ? filtered[0] : null;
            });

        if (args.imageName.indexOf("CharmanderTShirt") === 0) {
            args.imageTrackingActions.playVideo("https://github.com/EddyVerbruggen/nativescript-ar/raw/master/demo-pokemon/App_Resources/iOS/art.scnassets/celebration.mp4", true);
        } else {
            args.imageTrackingActions.playVideo("https://pokemonletsgo.pokemon.com/assets/video/go-park-video.mp4", true);
        }

        // we could use this to stop looping the video after 5 seconds
        // setTimeout(() => args.imageTrackingActions.stopVideoLoop(), 5000);

        if (!pokemon) {
            return;
        }

        if (pokemon.model) {
            let interval: number;

            const name = isIOS
                ? `PokemonModels.scnassets/${pokemon.model.name}/${pokemon.model.name}.dae`
                : `${pokemon.model.name}.glb`;

            args.imageTrackingActions.addModel({
                name,
                scale: pokemon.model.scale / (isIOS ? 50 : .7),
                position: {
                    x: 0,
                    y: 0.035,
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
                        }, 1000 / fps) as any;
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
                    x: 0.03,
                    y: 0.03
                },
                position: {
                    x: 0.045,
                    y: -0.016,
                    z: 0.003
                },
                scale: 1,
                onTap: toggleFavorite
            }).then(node => favNode = node);
        };

        const addPokemonImage = () => {
            args.imageTrackingActions.addImage({
                image: pokemon.sprite,
                dimensions: {
                    x: 0.025,
                    y: 0.025
                },
                position: {
                    x: 0.046,
                    y: -0.016,
                    z: 0.005
                },
                scale: 1,
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
