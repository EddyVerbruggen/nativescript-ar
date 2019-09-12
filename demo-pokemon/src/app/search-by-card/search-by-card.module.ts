import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { FeaturedComponent } from "~/app/featured/featured.component";
import { SearchByCardRoutingModule } from "~/app/search-by-card/search-by-card-routing.module";
import { SearchByCardComponent } from "./search-by-card.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        SearchByCardRoutingModule
    ],
    declarations: [
        SearchByCardComponent,
        FeaturedComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SearchByCardModule {
}
