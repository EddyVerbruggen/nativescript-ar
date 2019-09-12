import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { AugmentCardComponent } from "./augment-card.component";

const routes: Routes = [
    { path: "", component: AugmentCardComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class AugmentCardRoutingModule { }
