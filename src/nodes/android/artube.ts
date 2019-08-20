import { ARAddTubeOptions } from "../../ar-common";
import { ARCommonNode } from "./arcommon";
import { ARCommonGeometryNode } from "./arcommongeometry";

export class ARTube extends ARCommonGeometryNode {

  static create(options: ARAddTubeOptions, fragment): Promise<ARTube> {
    return new Promise<ARTube>(async (resolve, reject) => {
      const node = ARCommonNode.createNode(options, fragment);

      const defaultMaterial = await ARCommonNode.getDefaultMaterial();

      // innerRadius is not used ShapeFactory makes a cylinder only
      const radius = options.outerRadius;
      const height = options.height;
      const center = new (<any>com.google.ar.sceneform).math.Vector3(0, 0, 0);

      const renderable = com.google.ar.sceneform.rendering.ShapeFactory.makeCylinder(
          radius,
          height,
          center,
          defaultMaterial);

      node.setRenderable(renderable);

      resolve(new ARTube(options, node));
    });
  }
}