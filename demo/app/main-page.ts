import * as observable from 'tns-core-modules/data/observable';
import * as pages from 'tns-core-modules/ui/page';
import { ARLoadedEventData, ARPlaneDetectedEventData, ARPlaneTappedEventData } from 'nativescript-ar';
import { HelloWorldModel } from './main-view-model';

// Event handler for Page 'loaded' event attached in main-page.xml
export function pageLoaded(args: observable.EventData) {
  // Get the event sender
  let page = <pages.Page>args.object;
  page.bindingContext = new HelloWorldModel();
}

export function arLoaded(args: ARLoadedEventData): void {
  // add a few models
  args.object.addBox({
    position: {
      x: 0.6,
      y: 0.6,
      z: 0.6
    },
    scale: 0.2,
    material: "tnsgranite"
  }).then(node => console.log("box added: " + node.id));

  args.object.addSphere({
    position: {
      x: 0.9,
      y: 0.9,
      z: 0.6
    },
    radius: 0.2
  }).then(node => console.log("sphere added: " + node.id));

  args.object.addTube({
    position: {
      x: 0.6,
      y: 0.3,
      z: 0.3
    },
    innerRadius: 0.1,
    outerRadius: 0.15,
    height: 0.2
  }).then(node => console.log("tube added: " + node.id));
}

export function planeDetected(args: ARPlaneDetectedEventData): void {
  console.log("Plane detected (id): " + args.plane.id);
}

export function planeTapped(args: ARPlaneTappedEventData): void {
  console.log("Plane tapped @ x coordinate: " + args.position.x);

  args.object.addBox({
    position: {
      x: args.position.x,
      y: args.position.y + 1, // drop the box from a meter high
      z: args.position.z
    },
    scale: 0.15,
    chamferRadius: 0.01,
    material: "tnsgranite",
    mass: 0.0000001,
    onTap: node => console.log("box tapped: " + node.id)
  }).then(node => console.log("box added: " + node.id));
}
