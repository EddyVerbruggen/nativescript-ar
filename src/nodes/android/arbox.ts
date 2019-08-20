import { ARAddBoxOptions } from "../../ar-common";
import { ARCommonNode } from "./arcommon";
import { ARCommonGeometryNode } from "./arcommongeometry";

export class ARBox extends ARCommonGeometryNode {

  static create(options: ARAddBoxOptions, fragment): Promise<ARBox> {
    return new Promise<ARBox>(async (resolve, reject) => {
      const node = ARCommonNode.createNode(options, fragment);

      const defaultMaterial = await ARCommonNode.getDefaultMaterial();

      const size = new (<any>com.google.ar.sceneform).math.Vector3(
          options.dimensions instanceof Object ? options.dimensions.x : options.dimensions,
          options.dimensions instanceof Object ? options.dimensions.y : options.dimensions,
          options.dimensions instanceof Object ? options.dimensions.z : options.dimensions);

      const center = new (<any>com.google.ar.sceneform).math.Vector3(0, 0, 0);

      const renderable = com.google.ar.sceneform.rendering.ShapeFactory.makeCube(
          size,
          center,
          defaultMaterial);

      node.setRenderable(renderable);

      resolve(new ARBox(options, node));
    });
  }
}