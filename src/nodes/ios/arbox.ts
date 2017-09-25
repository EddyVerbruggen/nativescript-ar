import { ARAddBoxOptions, ARDimensions } from "../../ar-common";
import { ARCommonNode } from "./arcommon";
import { ARMaterial } from "./armaterial";

export class ARBox extends ARCommonNode {
  static create(options: ARAddBoxOptions) {
    console.log(">>> options.dimensions: " + JSON.stringify(options.dimensions));
    console.log(">>> typeof options.dimensions: " + (typeof options.dimensions));
    const dimensions: ARDimensions = <ARDimensions>(typeof options.dimensions !== "number" ? options.dimensions : {
      x: options.dimensions,
      y: options.dimensions,
      z: options.dimensions
    });
    console.log(">>> dimensions: " + JSON.stringify(dimensions));

    const box = SCNBox.boxWithWidthHeightLengthChamferRadius(dimensions.x, dimensions.y, dimensions.z, options.chamferRadius || 0.0);
    console.log(">>> box.width: " + box.width);
    console.log(">>> box.height: " + box.height);
    console.log(">>> box.length: " + box.length);

    // make the box look nice
    if (options.material) {
      const materialArray: NSMutableArray<any> = NSMutableArray.alloc().initWithCapacity(1);
      materialArray.addObject(ARMaterial.getMaterial(options.material));
      box.materials = materialArray;
    }

    return new ARBox(options, SCNNode.nodeWithGeometry(box));
  }
}
