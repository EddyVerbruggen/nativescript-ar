import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";

const routes: Routes = [
    {path: "", redirectTo: "/home", pathMatch: "full"},
    {path: "home", loadChildren: "../app/home/home.module#HomeModule"},
    {path: "augment-card", loadChildren: "../app/augment-card/augment-card.module#AugmentCardModule"},
    {path: "search-by-card", loadChildren: "../app/search-by-card/search-by-card.module#SearchByCardModule"},
    {path: "try-before-you-buy", loadChildren: "../app/try-before-you-buy/try-before-you-buy.module#TryBeforeYouBuyModule"},
    {path: "settings", loadChildren: "../app/settings/settings.module#SettingsModule"}
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule {
}
