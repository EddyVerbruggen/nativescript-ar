import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { PileEmUpRoutingModule } from "./pile-em-up-routing.module";
import { PileEmUpComponent } from "./pile-em-up.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        PileEmUpRoutingModule
    ],
    declarations: [
        PileEmUpComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class PileEmUpModule {
}
