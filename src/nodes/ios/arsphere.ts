import { ARAddSphereOptions } from "../../ar-common";
import { ARCommonGeometryNode } from "./arcommongeometry";

export class ARSphere extends ARCommonGeometryNode {
  static create(options: ARAddSphereOptions) {
    const sphere = SCNSphere.sphereWithRadius(options.radius);

    if (options.segmentCount) {
      sphere.segmentCount = options.segmentCount;
    }

    return new ARSphere(options, SCNNode.nodeWithGeometry(sphere));
  }
}
