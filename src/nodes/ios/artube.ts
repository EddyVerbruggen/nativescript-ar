import { ARAddTubeOptions } from "../../ar-common";
import { ARCommonGeometryNode } from "./arcommongeometry";

export class ARTube extends ARCommonGeometryNode {
  static create(options: ARAddTubeOptions, renderer: SCNSceneRenderer) {
    const tube = SCNTube.tubeWithInnerRadiusOuterRadiusHeight(options.innerRadius, options.outerRadius, options.height);
    return new ARTube(options, SCNNode.nodeWithGeometry(tube), renderer);
  }
}
