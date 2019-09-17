import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { TryBeforeYouBuyRoutingModule } from "./try-before-you-buy-routing.module";
import { TryBeforeYouBuyComponent } from "./try-before-you-buy.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        TryBeforeYouBuyRoutingModule
    ],
    declarations: [
        TryBeforeYouBuyComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class TryBeforeYouBuyModule {
}
