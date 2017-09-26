import { ARAddBoxOptions, ARDimensions } from "../../ar-common";
import { ARCommonGeometryNode } from "./arcommongeometry";

export class ARBox extends ARCommonGeometryNode {
  static create(options: ARAddBoxOptions) {
    const dimensions: ARDimensions = <ARDimensions>(typeof options.dimensions !== "number" ? options.dimensions : {
      x: options.dimensions,
      y: options.dimensions,
      z: options.dimensions
    });

    const box = SCNBox.boxWithWidthHeightLengthChamferRadius(dimensions.x, dimensions.y, dimensions.z, options.chamferRadius || 0.0);
    return new ARBox(options, SCNNode.nodeWithGeometry(box));
  }
}
