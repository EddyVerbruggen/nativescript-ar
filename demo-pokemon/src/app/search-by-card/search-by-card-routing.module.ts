import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";
import { PokemonSearchResultComponent } from "../../app/search-by-card/pokemon-search-result/pokemon-search-result.component";
import { SearchByCardComponent } from "./search-by-card.component";

const routes: Routes = [
    {path: "", component: SearchByCardComponent},
    {path: "pokemon-search-result", component: PokemonSearchResultComponent}
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class SearchByCardRoutingModule {
}
