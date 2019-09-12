import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { PokemonSearchResultRoutingModule } from "./pokemon-search-result-routing.module";
import { PokemonSearchResultComponent } from "./pokemon-search-result.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        PokemonSearchResultRoutingModule
    ],
    declarations: [
        PokemonSearchResultComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class PokemonSearchResultModule {
}
