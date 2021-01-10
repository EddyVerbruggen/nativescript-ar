import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule, registerElement } from "@nativescript/angular";
import { PagerModule } from 'nativescript-pager/angular';

import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";
import { PreviewGlassesComponent } from "./preview-glasses/preview-glasses.component";

registerElement("AR", () => require("nativescript-ar").AR);

@NgModule({
  imports: [
    NativeScriptCommonModule,
    HomeRoutingModule,
    PagerModule
  ],
  declarations: [
    HomeComponent,
    PreviewGlassesComponent
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class HomeModule {
}
