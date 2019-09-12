import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { PokemonSearchResultComponent } from "./pokemon-search-result/pokemon-search-result.component";
import { SearchByCardRoutingModule } from "./search-by-card-routing.module";
import { SearchByCardComponent } from "./search-by-card.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        SearchByCardRoutingModule
    ],
    declarations: [
        SearchByCardComponent,
        PokemonSearchResultComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SearchByCardModule {
}
