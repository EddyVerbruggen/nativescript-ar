import * as observable from 'tns-core-modules/data/observable';
import * as pages from 'tns-core-modules/ui/page';
import { AR, ARNode, ARPlaneTappedEventData } from 'nativescript-ar';
import { HelloWorldModel } from './main-view-model';

let ar = new AR();

// Event handler for Page 'loaded' event attached in main-page.xml
export function pageLoaded(args: observable.EventData) {
  // Get the event sender
  let page = <pages.Page>args.object;
  page.bindingContext = new HelloWorldModel();
}

export function arLoaded(args): void {
  ar = args.object;
  ar.addBox({
    position: {
      x: 0.5,
      y: 0.5,
      z: 0.5
    },
    scale: 0.2
  }).then(
      (node: ARNode) => console.log("added node: " + node.id),
      (err) => console.log("addBox err: " + err));
}

export function planeDetected(args): void {
  console.log("Plane detected @ " + new Date().getTime());
}

export function planeTapped(args: ARPlaneTappedEventData): void {
  console.log("Plane tapped @ x coordinate: " + args.position.x);
  ar.addBox({
    position: args.position,
    scale: 0.1
  });
}
