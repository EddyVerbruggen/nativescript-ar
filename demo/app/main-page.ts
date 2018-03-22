import * as observable from 'tns-core-modules/data/observable';
import * as pages from 'tns-core-modules/ui/page';
import { ARLoadedEventData, ARPlaneDetectedEventData, ARPlaneTappedEventData, ARSceneTappedEventData } from 'nativescript-ar';
import { HelloWorldModel } from './main-view-model';
import { Color } from 'tns-core-modules/color';

// Event handler for Page 'loaded' event attached in main-page.xml
export function pageLoaded(args: observable.EventData) {
  // Get the event sender
  let page = <pages.Page>args.object;
  page.bindingContext = new HelloWorldModel();
}

export function arLoaded(args: ARLoadedEventData): void {
  // add some stuff to the scene

  args.object.addModel({
    name: "Models.scnassets/Car.dae",
    position: {
      x: 0,
      y: 0,
      z: -1
    },
    rotation: {
      x: 0,
      y: 180, // face towards camera
      z: 0
    },
    scale: 0.1
  });

  args.object.addBox({
    position: {
      x: -0.5,
      y: -0.5,
      z: -1
    },
    dimensions: {
      x: 0.25,
      y: 0.25,
      z: 0.52
    },
    materials: [{
      diffuse: {
        contents: "Assets.scnassets/Materials/tnsgranite/tnsgranite-diffuse.png",
        wrapMode: "ClampToBorder"
      }
    }],
    onTap: node => console.log("box tapped: " + node.id),
    draggingEnabled: true,
    rotatingEnabled: true
    // onPan: node => console.log("box panned: " + node.id),
  }).then(node => console.log("box added: " + node.id));

  args.object.addText({
    text: "NativeScript",
    position: {
      x: 2.7,
      y: -0.2,
      z: -4
    },
    scale: 0.1,
    depth: 1,
    materials: [new Color("blue")],
    rotation: {
      x: 5,
      y: 5,
      z: 5
    },
    // onPan: node => console.log("text panned: " + node.id),
  }).then(node => console.log("text added: " + node.id));

  args.object.addText({
    text: "is COOL",
    position: {
      x: 2.7,
      y: -1,
      z: -5
    },
    scale: 0.1,
    depth: 1,
    materials: [new Color("blue")],
    rotation: {
      x: 5,
      y: 5,
      z: 5
    },
  }).then(node => console.log("text added: " + node.id));

  args.object.addTube({
    position: {
      x: 0.3,
      y: 0.3,
      z: -1.2
    },
    innerRadius: 0.1,
    outerRadius: 0.15,
    height: 0.2,
    materials: [{
      diffuse: {
        contents: "Assets.scnassets/Materials/tnsgranite/tnsgranite-diffuse.png",
        wrapMode: "Repeat" // which is the default
      },
      roughness: "Assets.scnassets/Materials/tnsgranite/tnsgranite-roughness.png",
      transparency: 1 // solid (which is the default)
    }],
    rotation: {
      x: 20,
      y: 0,
      z: 0
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
    scale: 0.5,
    dimensions: 0.15,
    chamferRadius: 0.01,
    // material elements can either be a string or an 'ARMaterial' object
    materials: [
      "Assets.scnassets/Materials/tnsgranite/tnsgranite-diffuse.png",
      {
        name: "Assets.scnassets/Materials/tnsgranite2/tnsgranite2-diffuse.png",
        transparency: 0.9 // 0 - 1, lower number is more transparent
      }
    ],
    mass: 0.01,
    onTap: node => console.log("box tapped: " + node.id),
    // onPan: node => console.log("box panned: " + node.id)
  });
}

export function sceneTapped(args: ARSceneTappedEventData): void {
  console.log(`Scene tapped @ x / y coordinate: ${args.position.x} / ${args.position.y}`);
}
