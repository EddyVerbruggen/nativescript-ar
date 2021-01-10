import { Component } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { AR } from "nativescript-ar";
import { GlassesService } from "../services/glasses.service";

@Component({
  selector: "Home",
  moduleId: module.id,
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent {
  items: Array<any>;

  constructor(private _routerExtensions: RouterExtensions, private _glassesService: GlassesService) {
    this.items = this._glassesService.getGlasses();

    console.log(`Face tracking supported? ${AR.isFaceTrackingSupported()}`);
  }

  onGlassesTap(args): void {
    this._routerExtensions.navigate(["/home/preview-glasses", args.index],
        {
          animated: true,
          transition: {
            name: "slide",
            duration: 200,
            curve: "ease"
          },
          clearHistory: false
        });
  }
}
