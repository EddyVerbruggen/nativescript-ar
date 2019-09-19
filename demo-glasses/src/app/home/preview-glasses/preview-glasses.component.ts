import { Component, OnInit } from '@angular/core';
import { PageRoute, RouterExtensions } from 'nativescript-angular/router';
import { ARFaceTrackingActions, ARTrackingFaceEventData } from 'nativescript-ar';
import { switchMap } from "rxjs/operators";
import { Page } from 'tns-core-modules/ui/page/page';
import { GlassesService } from '~/app/services/glasses.service';

@Component({
  selector: 'ns-preview-glasses',
  templateUrl: './preview-glasses.component.html',
  styleUrls: ['./preview-glasses.component.css'],
  moduleId: module.id,
})
export class PreviewGlassesComponent implements OnInit {
  public items: Array<any>;
  public selectedModelIndex = -1;

  private trackForGlassesChanges: boolean;
  private faceTrackingActions: ARFaceTrackingActions;

  private currentlyActiveModel;

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
      setTimeout(() => {
        this.faceTrackingActions.addModel(this.items[this.selectedModelIndex].model)
            .then(model => this.currentlyActiveModel = model)
            .catch(err => console.log(`Error adding model: ${err}`));
      });
    }
  }

  trackingFaceDetected(args: ARTrackingFaceEventData): void {
    if (args.faceTrackingActions) {
      this.faceTrackingActions = args.faceTrackingActions;
      this.previewGlasses();
    }
  }
}
