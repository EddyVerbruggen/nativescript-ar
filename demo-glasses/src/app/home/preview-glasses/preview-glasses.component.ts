import { Component, OnInit } from "@angular/core";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";
import { ARFaceTrackingActions, ARTrackingFaceEventData } from 'nativescript-ar/ar-common';
import { switchMap } from "rxjs/operators";
import { Color } from "tns-core-modules/color";
import { Page } from "tns-core-modules/ui/page/page";
import { GlassesService } from "~/app/services/glasses.service";

@Component({
  selector: "ns-preview-glasses",
  templateUrl: "./preview-glasses.component.html",
  styleUrls: ["./preview-glasses.component.css"],
  moduleId: module.id,
})
export class PreviewGlassesComponent implements OnInit {
  public items: Array<any>;
  public selectedModelIndex = -1;

  private trackForGlassesChanges: boolean;
  private faceTrackingActions: ARFaceTrackingActions;

  private currentlyActiveModel;
  private currentlyActiveText;

  private tongueWasIn: boolean;

  constructor(private routerExtensions: RouterExtensions, private glassesService: GlassesService, private pageRoute: PageRoute, private page: Page) {
    this.items = this.glassesService.getGlasses();
    this.page.actionBarHidden = true;
  }

  ngOnInit(): void {
    this.pageRoute.activatedRoute.pipe(
        switchMap((activatedRoute) => activatedRoute.params))
        .forEach((params) => {
          this.selectedModelIndex = params.index;
        });
  }

  onLoaded(): void {
    this.trackForGlassesChanges = true;
  }

  onBackTapped(): void {
    this.routerExtensions.backToPreviousPage();
  }

  onIndexChanged($event) {
    if (this.trackForGlassesChanges && $event.value < this.items.length) {
      this.selectedModelIndex = $event.value;
      this.previewGlasses();
    }
  }

  private previewGlasses() {
    if (this.faceTrackingActions) {
      if (this.currentlyActiveModel) {
        this.currentlyActiveModel.remove();
      }
      if (this.currentlyActiveText) {
        this.currentlyActiveText.remove();
      }

      const glasses = this.items[this.selectedModelIndex];

      this.faceTrackingActions.addModel(glasses.model)
          .then(model => this.currentlyActiveModel = model)
          .catch(err => console.log(`Error adding model: ${err}`));

      // note that this is currently supported on iOS only
      this.faceTrackingActions.addText(
          {
            text: glasses.title,
            depth: 0.3,
            materials: [new Color("white")],
            scale: {
              x: 0.002,
              y: 0.002,
              z: 0.002
            },
            position: {
              x: -0.1, // a bit to the left
              y: 0.17, // and a bit up
              z: 0
            },
          })
          .then(result => this.currentlyActiveText = result)
          .catch(err => console.log(`Error adding text: ${err}`));
    }
  }

  trackingFaceDetected(args: ARTrackingFaceEventData): void {
    if (args.faceTrackingActions) {
      this.faceTrackingActions = args.faceTrackingActions;
      this.previewGlasses();
    }

    // on iOS you can stick your tongue out to go to the next pair of glasses
    if (args.properties) {
      // throttling this with 'tongueWasIn', otherwise it will detect a tongue real quickly again
      if (args.properties.tongueOut > 0.8 && this.tongueWasIn) {
        this.selectedModelIndex = (this.selectedModelIndex + 1) % this.items.length;
        this.tongueWasIn = false;
      } else if (args.properties.tongueOut < 0.2) {
        this.tongueWasIn = true;
      }
    }
  }
}
