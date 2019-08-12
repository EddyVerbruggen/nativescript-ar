import { ARAddSphereOptions } from "../../ar-common";
import { ARCommonNode } from "./arcommon";
import { ARCommonGeometryNode } from "./arcommongeometry";

export class ARSphere extends ARCommonGeometryNode {

  static create(options: ARAddSphereOptions, fragment): Promise<ARSphere> {
    return new Promise<ARSphere>(async (resolve, reject) => {
      const node = new com.google.ar.sceneform.ux.TransformableNode(fragment.getTransformationSystem());

      const defaultMaterial = await ARCommonNode.getDefaultMaterial();

      const radius = options.radius;

      const center = new (<any>com.google.ar.sceneform).math.Vector3(0, 0, 0);

      const renderable = com.google.ar.sceneform.rendering.ShapeFactory.makeSphere(
          radius,
          center,
          defaultMaterial);

      node.setRenderable(renderable);

      node.select(); // optional; this can be removed
      resolve(new ARSphere(options, node));
    });
  }
}