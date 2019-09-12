import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { PileEmUpComponent } from "./pile-em-up.component";

const routes: Routes = [
    {path: "", component: PileEmUpComponent}
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class PileEmUpRoutingModule {
}
