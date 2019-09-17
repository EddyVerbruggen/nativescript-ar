import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { TryBeforeYouBuyComponent } from "~/app/try-before-you-buy/try-before-you-buy.component";

const routes: Routes = [
    {path: "", component: TryBeforeYouBuyComponent}
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class TryBeforeYouBuyRoutingModule {
}
