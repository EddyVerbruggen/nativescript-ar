import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { FeaturedComponent } from "~/app/featured/featured.component";

import { SearchByCardComponent } from "./search-by-card.component";

const routes: Routes = [
    {path: "", component: SearchByCardComponent},
    {path: "pokemon", component: FeaturedComponent}
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class SearchByCardRoutingModule {
}
