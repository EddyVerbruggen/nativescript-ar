import { ARAddPlaneOptions } from "../../ar-common";
import { ARCommonNode } from "./arcommon";
import { ARCommonGeometryNode } from "./arcommongeometry";

export class ARPlane extends ARCommonGeometryNode {

  static create(options: ARAddPlaneOptions, fragment): Promise<ARPlane> {
    return new Promise<ARPlane>(async (resolve, reject) => {
      const node = ARCommonNode.createNode(options, fragment);

      const defaultMaterial = await ARCommonNode.getDefaultMaterial();

      const size = new (<any>com.google.ar.sceneform).math.Vector3(
          options.dimensions instanceof Object ? options.dimensions.x : options.dimensions,
          options.dimensions instanceof Object ? options.dimensions.y : options.dimensions,
          0.01);

      const center = new (<any>com.google.ar.sceneform).math.Vector3(0, 0, 0);

      const renderable = com.google.ar.sceneform.rendering.ShapeFactory.makeCube(
          size,
          center,
          defaultMaterial);

      node.setRenderable(renderable);

      resolve(new ARPlane(options, node));
    });
  }
}