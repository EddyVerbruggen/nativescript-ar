import * as observable from 'tns-core-modules/data/observable';
import * as pages from 'tns-core-modules/ui/page';
import { AR, ARPlaneTappedEventData } from 'nativescript-ar';
import { HelloWorldModel } from './main-view-model';

let ar: AR;

// Event handler for Page 'loaded' event attached in main-page.xml
export function pageLoaded(args: observable.EventData) {
  // Get the event sender
  let page = <pages.Page>args.object;
  page.bindingContext = new HelloWorldModel();
}

export function arLoaded(args): void {
  ar = args.object;
  // add a few models
  ar.addBox({
    position: {
      x: 0.6,
      y: 0.6,
      z: 0.6
    },
    scale: 0.2,
    material: "tnsgranite"
  }).then(node => console.log("box added: " + node.id));

  ar.addSphere({
    position: {
      x: 0.9,
      y: 0.9,
      z: 0.6
    },
    radius: 0.2
  }).then(node => console.log("sphere added: " + node.id));

  ar.addTube({
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

export function planeDetected(args): void {
  console.log("Plane detected @ " + new Date().getTime());
  console.log("Plane detected: " + args.plane);
  console.log("Plane detected (object): " + args.object);
}

// TODO can we get ar from args (instead of caching it in this file globally)?
export function planeTapped(args: ARPlaneTappedEventData): void {
  console.log("Plane tapped @ x coordinate: " + args.position.x);
  ar.addBox({
    position: {
      x: args.position.x,
      y: args.position.y + 1, // drop the box from a meter high
      z: args.position.z
    },
    scale: 0.15,
    material: "tnsgranite",
    mass: 0.0000001,
    onTap: node => console.log("box tapped: " + node.id)
  }).then(node => console.log("box added: " + node.id));
}
