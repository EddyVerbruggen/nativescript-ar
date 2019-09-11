import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { FeaturedComponent } from "~/app/featured/featured.component";

import { SearchComponent } from "./search.component";

const routes: Routes = [
    {path: "", component: SearchComponent},
    {path: "pokemon", component: FeaturedComponent}
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class SearchRoutingModule {
}
