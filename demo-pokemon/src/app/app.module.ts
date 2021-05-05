import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule, registerElement } from "@nativescript/angular";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";
import { PokemonDataService } from "../app/pokemon-data/pokemon-data-service";
import { PokemonFavoritesService } from "../app/pokemon-data/pokemon-favorites-service";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

registerElement("AR", () => require("nativescript-ar").AR);

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        AppRoutingModule,
        NativeScriptModule,
        NativeScriptUISideDrawerModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        PokemonDataService,
        PokemonFavoritesService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule {
}
