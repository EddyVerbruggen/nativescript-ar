import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";

import { HomeComponent } from "./home.component";
import { PreviewGlassesComponent } from "./preview-glasses/preview-glasses.component";

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "preview-glasses/:index", component: PreviewGlassesComponent}
];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule]
})
export class HomeRoutingModule {
}
