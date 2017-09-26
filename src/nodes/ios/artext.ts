import { ARAddTextOptions } from "../../ar-common";
import { ARCommonGeometryNode } from "./arcommongeometry";

export class ARText extends ARCommonGeometryNode {
  static create(options: ARAddTextOptions) {
    const text = SCNText.textWithStringExtrusionDepth(options.text, options.depth || 0.0);
    return new ARText(options, SCNNode.nodeWithGeometry(text));
  }
}
