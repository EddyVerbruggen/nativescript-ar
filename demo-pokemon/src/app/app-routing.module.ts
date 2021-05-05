import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";

const routes: Routes = [
    {path: "", redirectTo: "/home", pathMatch: "full"},
    {path: "home", loadChildren: () => import("../app/home/home.module").then(m=>m.HomeModule)},
    {path: "augment-card", loadChildren: () => import("../app/augment-card/augment-card.module").then(m=>m.AugmentCardModule)},
    {path: "search-by-card", loadChildren: () => import("../app/search-by-card/search-by-card.module").then(m=>m.SearchByCardModule)},
    {path: "try-before-you-buy", loadChildren: () => import("../app/try-before-you-buy/try-before-you-buy.module").then(m=>m.TryBeforeYouBuyModule)},
    {path: "settings", loadChildren: () => import("../app/settings/settings.module").then(m=>m.SettingsModule)}
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule {
}
