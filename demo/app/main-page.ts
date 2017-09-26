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
    dimensions: {
      x: 0.2,
      y: 0.3,
      z: 0.4
    },
    material: "tnsgranite"
  }).then(node => console.log("box added: " + node.id));

  args.object.addSphere({
    position: {
      x: 0.9,
      y: 0.9,
      z: 0.6
    },
    radius: 0.2,
    segmentCount: 200
  }).then(node => console.log("sphere added: " + node.id));

  args.object.addText({
    text: "{N}",
    position: {
      x: 2,
      y: 0.5,
      z: 2
    },
    scale: 0.2,
    depth: 0.3,
    rotation: {
      x: 20,
      y: 45,
      z: 45,
      w: 45
    },
  }).then(node => console.log("text added: " + node.id));

  args.object.addTube({
    position: {
      x: 0.6,
      y: 0.3,
      z: 0.3
    },
    innerRadius: 0.1,
    outerRadius: 0.15,
    height: 0.2,
    rotation: {
      x: 10,
      y: 0,
      z: 0,
      w: 5
    },
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
    dimensions: 0.15,
    chamferRadius: 0.01,
    material: "tnsgranite",
    mass: 0.0000001,
    onTap: node => console.log("box tapped: " + node.id)
  }).then(node => {
    console.log("box added: " + node.id);

    let animation = CABasicAnimation.animationWithKeyPath("morpher.weights[0]");
    animation.fromValue = 0.0;
    animation.toValue = 1.0;
    animation.autoreverses = true;
    animation.repeatCount = 5;
    animation.duration = 5;
    node.ios.addAnimationForKey(animation, null);

    console.log("anim done");
  });
}
