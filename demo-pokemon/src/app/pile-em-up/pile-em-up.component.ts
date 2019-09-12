import { Component } from "@angular/core";
import { RouterExtensions } from "nativescript-angular";
import { isIOS } from "tns-core-modules/platform";
import { PokemonDataService } from "~/app/pokemon-data/pokemon-data-service";
import { PokemonFavoritesService } from "~/app/pokemon-data/pokemon-favorites-service";
import { ARNodeInteraction, ARPlaneDetectedEventData, ARPlaneTappedEventData } from "../../../../src";

@Component({
    selector: "PileEmUp",
    templateUrl: "./pile-em-up.component.html"
})
export class PileEmUpComponent {

    constructor(private pokemonDataService: PokemonDataService,
                private pokemonFavoritesService: PokemonFavoritesService,
                private routerExtensions: RouterExtensions) {
    }

    onBackButtonTap(): void {
        this.routerExtensions.back();
    }

    planeDetected(args: ARPlaneDetectedEventData): void {
        console.log("Plane detected (id): " + args.plane.id);
    }

    async planeTapped(args: ARPlaneTappedEventData) {
        console.log("Plane tapped @ x coordinate: " + args.position.x);

        // TODO random model from pokemon.json
        args.object.addModel({
            name: isIOS ? "PokemonModels.scnassets/Bulbasaur/Bulbasaur.dae" : "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/DamagedHelmet/glTF-Binary/DamagedHelmet.glb",
            position: {
                x: args.position.x + 0.2,
                y: args.position.y + 0.5,
                z: args.position.z
            },
            rotation: {
                x: 0,
                y: 45,
                z: 0
            },
            scale: 0.01,
            onTap: (interaction: ARNodeInteraction) => {
                console.log("tapped model id: " + interaction.node.id);
                console.log("tapped model position: " + interaction.node.position);
                console.log("tapped model touchPosition: " + interaction.touchPosition);
                // interaction.node.moveBy({
                //   x: 0.02,
                //   y: 0.02,
                //   z: 0.02
                // });
                interaction.node.rotateBy({
                    x: 10,
                    y: 10,
                    z: 10
                });
                // interaction.node.scaleBy(-0.01);
            },
            onLongPress: (interaction: ARNodeInteraction) => console.log("model longpressed: " + interaction.node.id)
        }).catch(console.error);
    }
}
