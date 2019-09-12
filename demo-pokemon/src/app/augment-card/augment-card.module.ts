import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { AugmentCardRoutingModule } from "./augment-card-routing.module";
import { AugmentCardComponent } from "./augment-card.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        AugmentCardRoutingModule
    ],
    declarations: [
        AugmentCardComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AugmentCardModule {
}
